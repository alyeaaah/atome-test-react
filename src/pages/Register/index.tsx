import { useRef, useState } from "react";
import { Button, Checkbox, DatePicker, Form, FormInstance, Input, Modal, Radio } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";

import { RegisterApiHooks } from "./api";
import { useToast } from "@/components/Toast/ToastContext";
import { useNavigate } from "react-router-dom";
import { paths } from "@/router/paths";
import { MailOutlined, CheckCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { registerSchema, RegisterPayload } from "./api/schema";

export const Register = () => {
  const [agreement, setAgreement] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    description: "",
    onOk: () => { },
  });

  const { showNotification } = useToast();
  const navigate = useNavigate();
  const formRef = useRef<FormInstance>(null);

  const methods = useForm<RegisterPayload>({
    mode: "onChange",
    defaultValues: {
      email: "",
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      userStatus: 1,
    },
    resolver: zodResolver(registerSchema),
  });

  const { control, handleSubmit, formState } = methods;

  const { mutate: actionRegisterPlayer } = RegisterApiHooks.useRegister(
    {},
    {
      retry: 0,
      onSuccess: () => {
        showNotification({
          duration: 3000,
          text: "Player registered successfully, please login",
          icon: <CheckCircleOutlined />,
          variant: "success",
        });
        setModalConfig({
          title: "Register Success",
          description: "You have successfully registered, please login",
          onOk: () => navigate(paths.loginPage),
        });
        setModalVisible(true);
      },
    }
  );

  const onSubmit: SubmitHandler<any> = (data: RegisterPayload) => {
    data.id = Math.floor(Math.random() * 1000000);
    actionRegisterPlayer(data);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)} ref={formRef}>
          <Form.Item label="First Name" required>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => <Input {...field} placeholder="First Name" />}
            />
          </Form.Item>
          <Form.Item label="Last Name" required>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Last Name" />}
            />
          </Form.Item>

          <Form.Item label="Email" required>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Email" />}
            />
          </Form.Item>

          <Form.Item label="Phone">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Phone" />}
            />
          </Form.Item>

          <Form.Item label="Username" required>
            <Controller
              name="username"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Username" />}
            />
          </Form.Item>

          <Form.Item label="Password" required>
            <Controller
              name="password"
              control={control}
              render={({ field }) =>
                <div>
                  <Input.Password {...field} placeholder="Password" onChange={field.onChange}/>
                  {formState.errors.password && <p className="text-red-500">{formState.errors.password.message}</p>}
                </div>
              }
            />
          </Form.Item>

          <Form.Item label="Confirm Password" required>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => <div>
                <Input.Password {...field} placeholder="Confirm Password" />
                {formState.errors.confirmPassword && <p className="text-red-500">{formState.errors.confirmPassword.message}</p>}
              </div>}
            />
          </Form.Item>

          <Form.Item>
            <Checkbox checked={agreement} onChange={(e) => setAgreement(e.target.checked)}>
              I agree to the Atome <a href="#">Privacy Policy</a>.
            </Checkbox>
          </Form.Item>

          <div className="flex justify-between">
            <Button onClick={() => navigate(paths.loginPage)}>Sign In</Button>
            <Button
              type="primary"
              htmlType="button"
              disabled={!formState.isValid || !agreement || formState.isSubmitting}
              onClick={() => {
                setModalConfig({
                  title: "Register",
                  description: "Are you sure you want to register?",
                  onOk: () => methods.handleSubmit(onSubmit),
                });
                setModalVisible(true);
              }}
            >
              Register
            </Button>
          </div>

          <Modal
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            onOk={() => {
              modalConfig.onOk();
              formRef.current?.submit();
              setModalVisible(false);
            }}
            centered
          >
            <div className="text-center">
              <QuestionCircleOutlined className="text-4xl text-blue-500 mb-3" />
              <h3 className="text-lg font-semibold">{modalConfig.title}</h3>
              <p className="mt-2 text-gray-600">{modalConfig.description}</p>
            </div>
          </Modal>
        </Form>
      </div>

    </div>
  );
};
