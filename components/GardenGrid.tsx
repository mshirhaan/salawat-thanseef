// components/GardenGrid.tsx
import { useCallback, useEffect, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Plant } from "./Plant";
import styles from "./GardenGrid.module.css";
import {
  IconButton,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  VStack,
  Text,
  Box,
  HStack,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { placePlantInGarden } from "@/lib/garden";
import Link from "next/link";
import Image from "next/image";

type GardenGridProps = {
  userId: string;
};

export default function GardenGrid({ userId }: GardenGridProps) {
  const [gridSize, setGridSize] = useState<number>(3);
  const [plants, setPlants] = useState<
    Array<{ position: number; plantId: string }>
  >([]);
  const [availablePlants, setAvailablePlants] = useState<
    Array<{ plantId: string; name: string; quantity: number }>
  >([]); // User's available plants with emoji and quantity
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null); // Track selected grid position
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal control
  const [isLoading, setIsLoading] = useState(true);

  // Load user data, including garden and available plants
  const loadGardenData = useCallback(async () => {
    setIsLoading(true);
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const gardenData = userDoc.data()?.myGarden;
        const plantData = userDoc.data()?.myPlants || []; // Load available plants from user data
        setGridSize(gardenData?.gridSize || 3);
        setPlants(gardenData?.plants || []);
        setAvailablePlants(plantData); // Set available plants with emoji and quantity
      }
    } catch (error) {
      console.error("Error loading garden data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Handle placing a plant in the garden and reducing its quantity
  const handlePlantSelection = async (plantId: string) => {
    if (selectedPosition !== null) {
      setIsLoading(true);
      try {
        // Reduce the quantity of the selected plant
        const updatedPlants = availablePlants.map((plant) =>
          plant.plantId === plantId
            ? { ...plant, quantity: plant.quantity - 1 }
            : plant
        );

        // Update Firestore with new plant quantity and add plant to garden
        await updateDoc(doc(db, "users", userId), {
          myPlants: updatedPlants,
        });
        await placePlantInGarden(userId, selectedPosition, plantId); // Place the plant in the garden
        await loadGardenData(); // Reload data to reflect changes
      } catch (error) {
        console.error("Error placing plant:", error);
      } finally {
        setIsLoading(false);
        onClose(); // Close the modal after placing the plant
      }
    }
  };

  useEffect(() => {
    loadGardenData();
  }, [loadGardenData]);

  if (isLoading) {
    return (
      <Center height="300px">
        <Spinner size="xl" color="green.500" thickness="4px" />
      </Center>
    );
  }

  return (
    <>
      <div
        className={styles["garden-grid"]}
        style={{ gridTemplateColumns: `repeat(auto-fit, minmax(120px, 1fr))` }}
      >
        {[...Array(gridSize)].map((_, index) => (
          <div key={index} className={styles["garden-cell"]}>
            {/* Check if there's a plant at this position */}
            {plants.find((plant) => plant.position === index) ? (
              <Plant
                plantId={
                  plants.find((plant) => plant.position === index)?.plantId!
                }
              />
            ) : (
              <Tooltip label="Place Plant" fontSize="md">
                <IconButton
                  aria-label="Place Plant"
                  icon={<AiOutlinePlus />}
                  variant="outline"
                  colorScheme="green"
                  onClick={() => {
                    setSelectedPosition(index); // Set selected position
                    onOpen(); // Open the modal to select a plant
                  }}
                  size="lg"
                  className={styles["place-plant-button"]}
                />
              </Tooltip>
            )}
          </div>
        ))}
      </div>

      {/* Modal for selecting available plants */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select a Plant</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {availablePlants.length > 0 ? (
                availablePlants.map((plant) => (
                  <Button
                    key={plant.plantId}
                    onClick={() => handlePlantSelection(plant.plantId)}
                    variant="solid"
                    colorScheme="green"
                    isDisabled={plant.quantity === 0}
                    width="100%"
                    justifyContent="flex-start"
                    leftIcon={
                      <Box width={6} height={6} position="relative">
                        <Image
                          src={`/icons/${plant.plantId}.svg`}
                          alt={plant.name}
                          layout="fill"
                          objectFit="contain"
                        />
                      </Box>
                    }
                  >
                    <HStack justify="space-between" width="100%">
                      <Text>{plant.name}</Text>
                      <Text>(x{plant.quantity})</Text>
                    </HStack>
                  </Button>
                ))
              ) : (
                <Text>No available plants.</Text>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Link href="/store" passHref>
              <Button colorScheme="blue" ml={3}>
                Go to Store
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
