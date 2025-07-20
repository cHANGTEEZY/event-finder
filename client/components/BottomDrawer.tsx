import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Modal,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type BottomDrawerProps = {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  height?: number;
  keyboardAvoidingMovesDrawer?: boolean;
  keyboardVerticalOffset?: number;
};

const BottomDrawer = ({
  children,
  isVisible,
  onClose,
  height = SCREEN_HEIGHT * 0.4,
  keyboardAvoidingMovesDrawer = false,
  keyboardVerticalOffset,
}: BottomDrawerProps) => {
  const translateY = useRef(new Animated.Value(height)).current;
  const lastGestureDy = useRef(0);
  const [internalVisible, setInternalVisible] = useState(isVisible);

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
      setInternalVisible(false);
      Keyboard.dismiss();
    });
  };

  useEffect(() => {
    if (isVisible) {
      setInternalVisible(true);
      openDrawer();
    } else {
      closeDrawer();
    }
  }, [isVisible, height]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dy) > 10,
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

  if (!internalVisible) return null;

  const offset = keyboardAvoidingMovesDrawer
    ? 0
    : keyboardVerticalOffset !== undefined
      ? keyboardVerticalOffset
      : Platform.OS === "ios"
        ? height * 0.1
        : 0;

  const drawerContent = (
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
        {keyboardAvoidingMovesDrawer ? (
          <View style={styles.content}>{children}</View>
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.content}
            keyboardVerticalOffset={offset}
          >
            {children}
          </KeyboardAvoidingView>
        )}
      </Animated.View>
    </View>
  );

  return (
    <Modal
      visible={internalVisible}
      transparent
      statusBarTranslucent
      animationType="fade"
      onRequestClose={onClose}
    >
      {keyboardAvoidingMovesDrawer ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {drawerContent}
        </KeyboardAvoidingView>
      ) : (
        drawerContent
      )}
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
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    alignSelf: "center",
    marginVertical: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default BottomDrawer;
