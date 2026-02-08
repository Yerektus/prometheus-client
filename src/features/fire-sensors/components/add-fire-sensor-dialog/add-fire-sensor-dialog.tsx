import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/common/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";

import { Field, FieldError, FieldLabel } from "@/common/components/ui/field";
import { toast } from "sonner";
import { AddFireSensorDialogProps } from "./add-fire-sensor-dialog.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserByFullname } from "@/common/api/requests/users/fetch-user-by-fullname";
import { createFireSensor } from "@/common/api/requests/fire-sensors/create-fire-sensor";
import { buildHttpHandler } from "@/common/utils/build-http-error";

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
});

export const AddFireSensorDialog = ({
  isOpen,
  onClose,
}: AddFireSensorDialogProps) => {
  const createFireSensorMutation = useMutation({
    mutationFn: async ({
      userId,
      payload,
    }: {
      userId: string;
      payload: z.infer<typeof formSchema>;
    }) =>
      await createFireSensor({
        ownerId: userId,
        country: "Kazakhstan",
        city: payload.city,
        address: payload.address,
        floor: payload.floor,
        flat: payload.flat,
        serialNumber: payload.serialNumber,
        model: payload.model,
      }),
    onSuccess: () => {
      toast.success("Датчик добавлен успешно.");
      handleClose(true);
    },
  });

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

      await createFireSensorMutation.mutateAsync({
        userId: user.id,
        payload: values,
      });
    } catch (error) {
      buildHttpHandler(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Добавить новый датчик</DialogTitle>
          <DialogDescription>
            Вы можете добавить новый датчик вручную здесь
          </DialogDescription>
        </DialogHeader>
        <form id="add-user-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-4">
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="grid gap-2" data-invalid={fieldState.invalid}>
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
                <Field className="grid gap-2" data-invalid={fieldState.invalid}>
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
                <Field className="grid gap-2" data-invalid={fieldState.invalid}>
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
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Отмена</Button>
          </DialogClose>
          <Button
            type="submit"
            form="add-user-form"
            disabled={form.formState.isSubmitting}
          >
            Добавить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
