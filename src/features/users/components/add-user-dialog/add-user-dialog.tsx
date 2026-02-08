import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createUser } from "@/common/api/requests/users/create-user";
import { fetchRoles } from "@/common/api/requests/roles/fetch-roles";
import { buildHttpHandler } from "@/common/utils/build-http-error";
import { Button } from "@/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/common/components/ui/field";
import { AddUserDialogProps } from "./add-user-dialog.types";
import {
  MultiSelectField,
  MultiSelectOption,
} from "../multi-select-field/multi-select-field";

const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Имя обязательно.")
    .max(64, "Имя должно быть не длиннее 64 символов."),
  lastName: z
    .string()
    .trim()
    .min(1, "Фамилия обязательна.")
    .max(64, "Фамилия должна быть не длиннее 64 символов."),
  username: z
    .string()
    .trim()
    .min(1, "Username обязателен.")
    .max(64, "Username должен быть не длиннее 64 символов."),
  email: z.string().trim().email("Некорректный email."),
  phoneNumbers: z
    .string()
    .trim()
    .min(1, "Телефон обязателен.")
    .max(64, "Телефон должен быть не длиннее 64 символов."),
  roleIds: z.array(z.string()).min(1, "Выберите хотя бы одну роль."),
  fireSensorIds: z.array(z.string()),
});

const defaultValues: z.infer<typeof formSchema> = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phoneNumbers: "",
  roleIds: [],
  fireSensorIds: [],
};

export const AddUserDialog = ({
  isOpen,
  onClose,
  sensorOptions,
}: AddUserDialogProps) => {
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("Пользователь успешно добавлен.");
      handleClose(true);
    },
  });

  const { data: roles = [] } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
    retry: false,
    enabled: isOpen,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const roleOptions: MultiSelectOption[] = roles.map((role) => ({
    id: role.id,
    label: role.name,
  }));

  const handleClose = (needRefresh?: boolean) => {
    onClose(needRefresh);
    form.reset(defaultValues);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createUserMutation.mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        phoneNumbers: values.phoneNumbers,
        roleIds: values.roleIds,
        fireSensorIds: values.fireSensorIds,
      });
    } catch (error) {
      buildHttpHandler(error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="max-w-2xl" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Добавить пользователя</DialogTitle>
          <DialogDescription>
            Создайте нового пользователя и назначьте роли и связанные датчики.
          </DialogDescription>
        </DialogHeader>

        <form
          id="add-user-form"
          className="grid gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="grid gap-2 md:grid-cols-2">
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="lastName">Фамилия*</FieldLabel>
                  <Input
                    {...field}
                    id="lastName"
                    placeholder="Еренталов"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="firstName">Имя*</FieldLabel>
                  <Input
                    {...field}
                    id="firstName"
                    placeholder="Ердос"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="username">Username*</FieldLabel>
                  <Input
                    {...field}
                    id="username"
                    placeholder="erentalov"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phoneNumbers"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phoneNumbers">Телефон*</FieldLabel>
                  <Input
                    {...field}
                    id="phoneNumbers"
                    placeholder="+7 777 777 77 77"
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
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email*</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  placeholder="test@mail.com"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="roleIds"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="roleIds">Роли*</FieldLabel>
                <MultiSelectField
                  id="roleIds"
                  value={field.value}
                  onChange={field.onChange}
                  options={roleOptions}
                  placeholder="Выберите роли"
                  emptyMessage="Роли не найдены"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="fireSensorIds"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="fireSensorIds">
                  Связанные датчики
                </FieldLabel>
                <MultiSelectField
                  id="fireSensorIds"
                  value={field.value}
                  onChange={field.onChange}
                  options={sensorOptions.map((sensor) => ({
                    id: sensor.id,
                    label: sensor.label,
                  }))}
                  placeholder="Выберите датчики"
                  emptyMessage="Датчики не найдены"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleClose()}
            disabled={createUserMutation.isPending}
          >
            Отменить
          </Button>
          <Button
            type="submit"
            form="add-user-form"
            disabled={createUserMutation.isPending}
          >
            Создать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
