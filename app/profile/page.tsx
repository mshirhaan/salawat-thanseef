"use client";
import { useState, useEffect } from "react";
import { Box, Heading, Input, Button, Text, useToast } from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { withAuth } from "@/components/withAuth";

function Settings() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
    } else {
      router.push("/login");
    }
  }, [user, router]);

  const handleUpdateName = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { name });
      toast({
        title: "Name updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating name", error);
      toast({
        title: "Error",
        description: "Failed to update name. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={6} maxW="400px" mx="auto">
      <Heading mb={6}>Update Name</Heading>
      <Text mb={4}>
        This name will be used only to hide your real name on the leaderboard.
      </Text>
      <Input
        type="text"
        placeholder="New Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        mb={4}
      />
      <Button colorScheme="teal" isLoading={loading} onClick={handleUpdateName}>
        Update Name
      </Button>
    </Box>
  );
}

export default withAuth(Settings);
