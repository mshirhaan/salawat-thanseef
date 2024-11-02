"use client";
import React from "react";
import { useState } from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  useColorMode,
  useColorModeValue,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { FaHeart } from "react-icons/fa";

const MotionBox = motion(Box);

const benefits = [
  "Sending Salawat upon the Prophet ﷺ is a means of gaining Allah's blessing and mercy.",
  "For every single Salawat you send upon the Prophet ﷺ, Allah sends ten blessings upon you.",
  "The Prophet ﷺ will be a witness on the Day of Judgment for those who send abundant Salawat upon him.",
  "Sending Salawat is a means of having your sins forgiven and your ranks elevated. The Prophet ﷺ said: 'Whoever sends one blessing upon me, Allah will send ten blessings upon him, erase ten sins from him, and raise him ten degrees in status.'",
  "The closest people to the Prophet ﷺ on the Day of Resurrection will be those who sent the most Salawat upon him during their worldly life. This emphasizes the special status and proximity that awaits those who regularly engage in this blessed practice.",
  "Reciting Salawat helps in the fulfillment of needs and removal of difficulties. Many scholars have mentioned that when facing hardships or seeking the fulfillment of a particular need, increasing the recitation of Salawat can be a powerful means of finding relief and solutions.",
  // Add more benefits here
];

const SalawatBenefits = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { colorMode } = useColorMode();

  // Color modes
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const accentColor = useColorModeValue("green.600", "green.400");
  const cardBg = useColorModeValue("white", "gray.800");
  const statBg = useColorModeValue("teal.50", "gray.700");
  const verseBg = useColorModeValue("teal.50", "gray.800");
  const arabicColor = useColorModeValue("teal.800", "teal.200");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const filteredBenefits = benefits.filter((benefit) =>
    benefit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box bg={bgColor} minH="100vh">
      <Container maxW="container.xl" pt={24}>
        {/* Header Section */}
        <VStack spacing={6} mb={12}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading
              textAlign="center"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              bgGradient={`linear(to-r, ${accentColor}, teal.300)`}
              bgClip="text"
              mb={4}
            >
              Benefits of Sending Salawat
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              textAlign="center"
              color={textColor}
              maxW="2xl"
              mx="auto"
            >
              Discover the numerous spiritual rewards and blessings of sending
              Salawat upon our beloved Prophet Muhammad ﷺ
            </Text>
          </MotionBox>
        </VStack>

        {/* Search Bar */}
        <Box maxW="2xl" mx="auto" mb={12}>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <Search className="text-gray-400" size={20} />
            </InputLeftElement>
            <Input
              placeholder="Search benefits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg={cardBg}
              border={borderColor}
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)",
              }}
            />
          </InputGroup>
        </Box>

        {/* Benefits Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={16}>
          {filteredBenefits.map((benefit, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Box
                bg={cardBg}
                p={6}
                borderRadius="xl"
                boxShadow="xl"
                border="1px solid"
                borderColor={borderColor}
                position="relative"
                transition="transform 0.2s"
                _hover={{ transform: "translateY(-4px)" }}
                height="full"
              >
                <Box
                  position="absolute"
                  top={4}
                  left={4}
                  bg={statBg}
                  w={8}
                  h={8}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="teal.600"
                  fontWeight="bold"
                >
                  {index + 1}
                </Box>
                <Text color={textColor} mt={8} lineHeight="tall">
                  {benefit}
                </Text>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* Footer Quote */}
        <Box
          bg={verseBg}
          p={8}
          borderRadius="xl"
          boxShadow="xl"
          textAlign="center"
          mb={16}
        >
          <Text
            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
            fontFamily="'Uthmanic', 'Amiri', serif"
            mb={4}
            color={arabicColor}
            lineHeight={1.8}
          >
            مَنْ صَلَّى عَلَيَّ صَلاةً صَلَّى اللَّهُ عَلَيْهِ بِهَا عَشْرًا
          </Text>
          <Text
            fontSize={{ base: "md", lg: "lg" }}
            fontStyle="italic"
            color={textColor}
          >
            &quot;Whoever sends one blessing upon me, Allah will send ten
            blessings upon him.&quot;
          </Text>
          <Text
            fontSize="sm"
            color={useColorModeValue("gray.500", "gray.400")}
            mt={2}
          >
            - Prophet Muhammad ﷺ
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default SalawatBenefits;
