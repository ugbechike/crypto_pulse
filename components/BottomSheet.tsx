import { Sheet } from '@tamagui/sheet'
import { useEffect, useState } from 'react';
import { CoinDetails } from './CoinDetails';
import { View } from '@tamagui/core'
import { ScrollView } from 'react-native';
interface BottomSheetProps {
    open: boolean;
    onClose: () => void;
    onPositionChange?: (position: number) => void;
    selectedId: string | null;
}

export const BottomSheet = ({open, onClose, onPositionChange, selectedId}: BottomSheetProps) => {
  const [position, setPosition] = useState<number>(2);

  // Track position changes
  const handlePositionChange = (pos: number) => {
    setPosition(pos);
    onPositionChange?.(pos);
  };

  // Handle open/close events
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      handlePositionChange(2); // Notify with last position when closed
    }
    onClose();
  };

  // Update position when sheet opens
  useEffect(() => {
    if (open) {
      handlePositionChange(0);
    }
  }, [open]);

  return (
    <Sheet 
      open={open} 
      onOpenChange={handleOpenChange} 
      snapPoints={[85, 50, 10]} 
      dismissOnSnapToBottom 
      animation="medium"
      modal
      forceRemoveScrollEnabled={false}
      handleDisableScroll={false}
      onPositionChange={handlePositionChange}
      position={position}
    >
      <Sheet.Overlay
        backgroundColor="transparent"
        opacity={0.5}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />    
      {/* <Sheet.Handle backgroundColor="$gray" height={4} width={50} /> */}
      <Sheet.Frame 
        flex={1}
        backgroundColor={'$secondaryBackground'} 
        borderRadius={'$lg'}
      >
        <Sheet.ScrollView showsVerticalScrollIndicator={false} marginBottom={10}>
          <CoinDetails coinId={selectedId!} />
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
}