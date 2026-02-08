import { useEffect, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { fetchRoles } from "@/common/api/requests/roles/fetch-roles";
import { Button } from "@/common/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/common/components/ui/field";
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
  MultiSelectField,
  MultiSelectOption,
} from "../multi-select-field/multi-select-field";
import { DeleteUserDialog } from "../delete-user-dialog/delete-user-dialog";
import { UpdateUserDialog } from "../update-user-dialog/update-user-dialog";
import {
  UpdateUserDialogState,
  UpdateUserSheetProps,
} from "./update-user-sheet.types";

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

export const UpdateUserSheet = ({
  isOpen,
  onClose,
  user,
  sensorOptions,
}: UpdateUserSheetProps) => {
  const [updateDialogState, setUpdateDialogState] =
    useState<UpdateUserDialogState>({
      isOpen: false,
      payload: null,
    });
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const { data: roles = [] } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
    retry: false,
    enabled: isOpen,
  });

  const roleOptions: MultiSelectOption[] = roles.map((role) => ({
    id: role.id,
    label: role.name,
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (!user) {
      form.reset(defaultValues);
      return;
    }

    form.reset({
      firstName: user.user.firstName,
      lastName: user.user.lastName,
      username: user.user.username,
      email: user.user.email,
      phoneNumbers: user.user.phoneNumbers,
      roleIds: user.user.roles?.map((role) => role.id) ?? [],
      fireSensorIds: user.user.fireSensorIds ?? [],
    });
  }, [form, user]);

  const closeSheet = (needRefresh?: boolean) => {
    onClose(needRefresh);
    form.reset(defaultValues);
    setUpdateDialogState({ isOpen: false, payload: null });
    setIsOpenDeleteDialog(false);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      return;
    }

    setUpdateDialogState({
      isOpen: true,
      payload: {
        userId: user.id,
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        phoneNumbers: values.phoneNumbers,
        roleIds: values.roleIds,
        fireSensorIds: values.fireSensorIds,
      },
    });
  };

  return (
    <>
      <Sheet
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) closeSheet();
        }}
      >
        <SheetContent showCloseButton={false}>
          <SheetHeader>
            <SheetTitle>Редактировать пользователя</SheetTitle>
            <SheetDescription>
              Измените профиль пользователя, роли и связанные датчики.
            </SheetDescription>
          </SheetHeader>

          <form
            id="update-user-form"
            className="grid flex-1 auto-rows-min gap-4 px-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="grid gap-2 md:grid-cols-2">
              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="update-lastName">Фамилия*</FieldLabel>
                    <Input
                      {...field}
                      id="update-lastName"
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
                    <FieldLabel htmlFor="update-firstName">Имя*</FieldLabel>
                    <Input
                      {...field}
                      id="update-firstName"
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
                    <FieldLabel htmlFor="update-username">Username*</FieldLabel>
                    <Input
                      {...field}
                      id="update-username"
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
                    <FieldLabel htmlFor="update-phoneNumbers">
                      Телефон*
                    </FieldLabel>
                    <Input
                      {...field}
                      id="update-phoneNumbers"
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
                  <FieldLabel htmlFor="update-email">Email*</FieldLabel>
                  <Input
                    {...field}
                    id="update-email"
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
                  <FieldLabel htmlFor="update-roleIds">Роли*</FieldLabel>
                  <MultiSelectField
                    id="update-roleIds"
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
                  <FieldLabel htmlFor="update-fireSensorIds">
                    Связанные датчики
                  </FieldLabel>
                  <MultiSelectField
                    id="update-fireSensorIds"
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

          <SheetFooter>
            <Button type="submit" form="update-user-form" disabled={!user}>
              Сохранить изменения
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpenDeleteDialog(true)}
              disabled={!user}
            >
              Удалить
            </Button>
            <Button type="button" variant="ghost" onClick={() => closeSheet()}>
              Закрыть
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <UpdateUserDialog
        isOpen={updateDialogState.isOpen}
        payload={updateDialogState.payload}
        onClose={(needRefresh) => {
          setUpdateDialogState({ isOpen: false, payload: null });
          if (needRefresh) closeSheet(true);
        }}
      />

      <DeleteUserDialog
        userId={user?.id ?? ""}
        isOpen={isOpenDeleteDialog}
        onClose={(needRefresh) => {
          setIsOpenDeleteDialog(false);
          if (needRefresh) closeSheet(true);
        }}
      />
    </>
  );
};
