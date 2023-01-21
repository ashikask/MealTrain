import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
  Tooltip
} from "@chakra-ui/react";
import React from "react";

export function FilterSlider() {
    const [sliderValue, setSliderValue] = React.useState(5)
  const [showTooltip, setShowTooltip] = React.useState(false)
  return (
    <Slider defaultValue={1} min={0} max={5} step={1} m='5' onChange={(v) => setSliderValue(v)}
    onMouseEnter={() => setShowTooltip(true)}
    onMouseLeave={() => setShowTooltip(false)}>
        <SliderMark value={1} mt='5' ml='2.5' fontSize='xl'>
        1
      </SliderMark>
      <SliderMark value={2} mt='5' ml='2.5' fontSize='xl'>
        2
      </SliderMark>
      <SliderMark value={3} mt='5' ml='2.5' fontSize='xl'>
        3
      </SliderMark>
      <SliderMark value={4} mt='5' ml='2.5' fontSize='xl'>
        4
      </SliderMark>

      
      
      <SliderTrack bg="red.100">
        <Box position="relative" right={10} />
        <SliderFilledTrack bg="tomato" />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg='organge'
        color='white'
        placement='top'
        isOpen={showTooltip}
        label={`${sliderValue}%`}
      >
      <SliderThumb boxSize={6} />
      </Tooltip>
    </Slider>
  );
}
