import React, { useEffect, useRef } from "react";
import {
  View,
  Modal,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type BottomDrawerProps = {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  height?: number;
};

const BottomDrawer = ({
  children,
  isVisible,
  onClose,
  height = SCREEN_HEIGHT * 0.4,
}: BottomDrawerProps) => {
  const translateY = useRef(new Animated.Value(height)).current;
  const lastGestureDy = useRef(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dy) > 10;
    },
    onPanResponderGrant: () => {
      translateY.setOffset(lastGestureDy.current);
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      translateY.flattenOffset();
      lastGestureDy.current = gestureState.dy;

      if (gestureState.dy > height * 0.3) {
        closeDrawer();
      } else {
        openDrawer();
      }
    },
  });

  const openDrawer = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const closeDrawer = () => {
    Animated.spring(translateY, {
      toValue: height,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start(() => {
      onClose();
    });
  };

  useEffect(() => {
    if (isVisible) {
      openDrawer();
    } else {
      translateY.setValue(height);
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      transparent
      statusBarTranslucent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={closeDrawer}
        />
        <Animated.View
          style={[
            styles.drawer,
            {
              height,
              transform: [{ translateY }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.handle} />
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
  },
  drawer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default BottomDrawer;
