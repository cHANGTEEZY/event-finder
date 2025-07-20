import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/schema/event-schema";
import CustomInput from "../CustomInput";
import z from "zod";
import CustomButton from "../CustomButton";
import { ScrollView } from "react-native-gesture-handler";

type IeventForm = z.infer<typeof eventSchema>;

const EventForm = ({ handleCloseModal }: { handleCloseModal: () => void }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IeventForm>({
    defaultValues: {
      eventName: "",
      eventDate: new Date(),
      eventTime: undefined,
      location: "",
    },
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = (data: IeventForm) => {
    console.log(data);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text className="text-4xl mt-5 font-bold">Create Event</Text>

      <ScrollView
        className="mt-8 flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1">
          <Controller
            control={control}
            name="eventName"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                label="Event name"
                error={errors.eventName?.message}
                placeholder="Enter event name"
                secureTextEntry={false}
              />
            )}
          />
          <Controller
            control={control}
            name="eventDate"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.eventDate?.message}
                label="Event Date"
                placeholder="Enter event date"
                secureTextEntry={false}
              />
            )}
          />
          <Controller
            control={control}
            name="eventTime"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                label="Event time"
                error={errors.eventTime?.message}
                placeholder="Enter event time"
                secureTextEntry={false}
              />
            )}
          />
          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.location?.message}
                label="Event location"
                placeholder="Enter event location"
                secureTextEntry={false}
              />
            )}
          />
          <View className="gap-2 mt-10">
            <CustomButton
              buttonText="cancel"
              backgroundColor="#2f3a4b"
              textColor="white"
              onPress={handleCloseModal}
            />
            <CustomButton
              buttonText="Create Event"
              backgroundColor="#4e0189"
              textColor="white"
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          <View className="flex-row  gap-2 pb-4 pt-4 mb-10"></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventForm;
