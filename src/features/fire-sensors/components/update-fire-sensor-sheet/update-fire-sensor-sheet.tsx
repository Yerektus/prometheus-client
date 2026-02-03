import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/common/components/ui/sheet";
import {
  FireSensorAndLocation,
  UpdateFireSensorSheetProps,
} from "./update-fire-sensor-sheet.types";
import { z } from "zod";
import { buildHttpHandler } from "@/common/utils/build-http-error";
import { fetchUserByFullname } from "@/common/api/requests/users/fetch-user-by-fullname";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/common/components/ui/field";
import { useEffect, useState } from "react";
import { UpdateFireSensorDialog } from "../update-fire-sensor-dialog/update-fire-sensor-dialog";
import { DeleteFireSensorDialog } from "../delete-fire-sensor-dialog/delete-fire-sensor-dialog";

const formSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "fullName is required.")
    .max(32, "Firstname must be at most 32 characters."),
  serialNumber: z
    .string()
    .trim()
    .min(1, "serialNumber is required.")
    .max(32, "serialNumber must be at most 32 characters."),
  model: z
    .string()
    .trim()
    .min(1, "model is required.")
    .max(32, "model must be at most 32 characters."),
  city: z
    .string()
    .trim()
    .min(1, "city is required.")
    .max(32, "city must be at most 32 characters."),
  address: z
    .string()
    .trim()
    .min(1, "address is required.")
    .max(32, "address must be at most 32 characters."),
  floor: z
    .string()
    .trim()
    .min(1, "address is required.")
    .max(32, "address must be at most 32 characters.")
    .optional(),
  flat: z
    .string()
    .trim()
    .min(1, "address is required.")
    .max(32, "address must be at most 32 characters.")
    .optional(),
  isActive: z.boolean().optional(),
});

export function UpdateFireSensorSheet({
  isOpen,
  onClose,
  fireSensor,
}: UpdateFireSensorSheetProps) {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [fireSensorAndLocation, setFireSensorAndLoction] =
    useState<FireSensorAndLocation>({} as FireSensorAndLocation);
  const [deletefireSensorId, setDeletefireSensorId] = useState<string>("");
  const [isOpenDeleteDialog, setIsOpenDelteDialog] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      serialNumber: "",
      city: "",
      address: "",
      floor: "",
      flat: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!fireSensor) return;

    const firstUser = fireSensor.users?.[0];

    form.reset({
      fullName: firstUser ? `${firstUser.lastName} ${firstUser.firstName}` : "",
      serialNumber: fireSensor.serialNumber ?? "",
      model: fireSensor.model ?? "",
      city: fireSensor.city ?? "",
      address: fireSensor.address ?? "",
      floor: fireSensor.floor ?? "",
      flat: fireSensor.flat ?? "",
    });
  }, [fireSensor]);

  const handleCloseDialog = (needRefresh?: boolean) => {
    setIsOpenDialog(false);
    onClose(needRefresh);
    form.reset();
  };

  const handleOpenDialog = (payload: FireSensorAndLocation) => {
    setIsOpenDialog(true);
    setFireSensorAndLoction(payload);
  };

  const handleCloseDeleteDialog = (needRefresh?: boolean) => {
    setIsOpenDelteDialog(false);
    onClose(needRefresh);
    form.reset();
  };

  const handleOpenDeleteDialog = (fireSensorId: string) => {
    setIsOpenDelteDialog(true);
    setDeletefireSensorId(fireSensorId);
  };

  const handleClose = (needRefresh?: boolean) => {
    onClose(needRefresh);
    form.reset();
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const fullNameArray = values.fullName.split(" ");

    try {
      const user = await queryClient.fetchQuery({
        queryKey: ["user", "byFullName"],
        queryFn: async () =>
          await fetchUserByFullname(fullNameArray[0], fullNameArray[1]),
      });

      handleOpenDialog({
        ownerId: user.id,
        fireSensorId: fireSensor.fireSensorId ?? "",
        locationId: fireSensor.locationId ?? "",
        country: fireSensor.country ?? "",
        city: values.city ?? "",
        address: values.address ?? "",
        floor: values.floor ?? "",
        flat: values.flat ?? "",
        serialNumber: values.serialNumber ?? "",
        model: values.model ?? "",
      });
    } catch (error) {
      buildHttpHandler(error);
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Редактировать</SheetTitle>
            <SheetDescription>
              Внесите изменения в настройки датчика пожара здесь.
            </SheetDescription>
          </SheetHeader>
          <form
            id="update-fire-sensor-form"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="grid flex-1 auto-rows-min gap-4 px-4">
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className="grid gap-2"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel htmlFor="fullName">Фамилия и имя*</FieldLabel>
                    <Input
                      {...field}
                      id="fullName"
                      placeholder="Еренталов Ердос"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="flex items-start gap-2">
                <Controller
                  name="model"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      className="grid gap-2"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor="model">Модель*</FieldLabel>
                      <Input
                        {...field}
                        id="model"
                        placeholder="Прототип"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="serialNumber"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      className="grid gap-2"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor="serialNumber">
                        Серийный номер*
                      </FieldLabel>
                      <Input
                        {...field}
                        id="serialNumber"
                        placeholder="1234"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className="grid gap-2"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel htmlFor="city">Город*</FieldLabel>
                    <Input
                      {...field}
                      id="city"
                      placeholder="Алматы"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className="grid gap-2"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel htmlFor="address">Адрес*</FieldLabel>
                    <Input
                      {...field}
                      id="address"
                      placeholder="Толе би 59"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="flex items-start gap-2">
                <Controller
                  name="floor"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      className="grid gap-2"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor="floor">Этаж</FieldLabel>
                      <Input
                        {...field}
                        id="floor"
                        placeholder="1"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="flat"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      className="grid gap-2"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor="flat">Квартира</FieldLabel>
                      <Input
                        {...field}
                        id="flat"
                        placeholder="12"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              {/*<Controller
                name="skills"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="grid gap-2" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="skills">Skills</FieldLabel>

                    <Input
                      {...field}
                      id="skills"
                      placeholder="Enter the skill and press Enter"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();

                          const value = skillInput.trim();
                          if (!value) return;

                          const current = form.getValues("skills");
                          if (current.includes(value)) return;

                          form.setValue("skills", [...current, value], {
                            shouldValidate: true,
                          });

                          setSkillInput("");
                        }
                      }}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}

                    <div className="flex items-center flex-wrap gap-2 mt-2">
                      {form.watch("skills").map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm"
                        >
                          {skill}
                          <button
                            type="button"
                            className="cursor-pointer"
                            onClick={() =>
                              form.setValue(
                                "skills",
                                form
                                  .getValues("skills")
                                  .filter((s) => s !== skill),
                                { shouldValidate: true },
                              )
                            }
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </Field>
                )}
              />*/}
            </div>
          </form>
          <SheetFooter>
            <Button
              type="submit"
              form="update-fire-sensor-form"
              disabled={form.formState.isSubmitting}
            >
              Сохранить изменения
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                handleOpenDeleteDialog(fireSensor.fireSensorId ?? "")
              }
            >
              Удалить
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <UpdateFireSensorDialog
        fireSensorAndLocation={fireSensorAndLocation}
        isOpen={isOpenDialog}
        onClose={handleCloseDialog}
      />
      <DeleteFireSensorDialog
        fireSensorId={deletefireSensorId}
        isOpen={isOpenDeleteDialog}
        onClose={handleCloseDeleteDialog}
      />
    </>
  );
}
