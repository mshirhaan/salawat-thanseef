"use client";

import React, { Suspense, useState } from "react";
import { Box, VStack, Text, useColorModeValue } from "@chakra-ui/react";
import { useParams } from "next/navigation"; // For dynamic route handling

// Import components
import { AudioPlayer } from "./AudioPlayer";
import { BaithText } from "./BaithText";
import allBaiths from "../data";

// Example AllBaiths data (can be replaced with actual data source)

export default function BaithPage({ params }: { params: { id: string } }) {
  const baithData = allBaiths[params.id]; // Find the corresponding baith

  const [currentTime, setCurrentTime] = useState(0);
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const accentColor = useColorModeValue("green.600", "green.400");

  const handleTimeUpdate = (time: number) => setCurrentTime(time);

  if (!baithData) {
    return (
      <Box minHeight="100vh" bg={bgColor} color={textColor} p={4}>
        <Text fontSize="2xl" textAlign="center">
          Baith not found.
        </Text>
      </Box>
    );
  }

  return (
    <Box minHeight="100vh" bg={bgColor} color={textColor} p={4}>
      <VStack spacing={8} align="stretch">
        <Text
          fontSize="3xl"
          fontWeight="bold"
          textAlign="center"
          color={accentColor}
        >
          {baithData.title}
        </Text>

        {baithData.audioUrl && (
          <Suspense fallback={<Text>Loading audio player...</Text>}>
            <Box
              position="fixed"
              bottom="0"
              left="0"
              right="0"
              zIndex={1000}
              boxShadow="lg"
              padding="4"
            >
              <AudioPlayer
                audioUrl={baithData.audioUrl}
                onTimeUpdate={handleTimeUpdate}
              />
            </Box>
          </Suspense>
        )}

        <Suspense fallback={<Text>Loading baith text...</Text>}>
          <BaithText lines={baithData.lines} currentTime={currentTime} />
        </Suspense>
      </VStack>
    </Box>
  );
}
