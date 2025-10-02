import clsx from "clsx";
import { useSetAtom } from "jotai";
import { paths } from "@/router/paths";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginPayload, loginPayloadSchema } from "./api/schema";
import { accessTokenAtom, userAtom } from "@/utils/store";
import { IconLogo } from "@/assets/images/icons";
import { Illustration } from "@/assets/images/illustrations/illustrations";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import { callApiDirect } from "@/utils/axios";

function Main() {
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(accessTokenAtom);
  const navigate = useNavigate();
  // const { mutate: actionLoginApi } = loginApiHooks.useLogin();

  const methods = useForm<loginPayload>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginPayloadSchema),
    mode: "onChange",
  });

  const goLogin = (values: loginPayload) => {
    callApiDirect("get", "user/login", values)
      .then((res) => {
        setToken(res.data);
        setUser({
          id: res.data,
          email: res.data,
          username: res.data,
          firstName: res.data,
          lastName: res.data,
          userStatus: res.data,
          phone: res.data,
        });
        navigate(paths.administrator.dashboard);
      })
      .catch((e) => {
        console.error("Failed to login:", e);
      });
    // actionLoginApi(values, {
    //   onSuccess: async (e) => {
    //     setToken(e.token);
    //     loginApiClient
    //       .get("/user/get")
    //       .then((res) => {
    //         setUser(res.data);
    //         if (res.data.userStatus == 1) {
    //           navigate(paths.administrator.dashboard);
    //         }
    //       })
    //       .catch((e) => {
    //         console.error("Failed to fetch user data:", e);
    //       });
    //   },
    //   onError: () => {
    //     alert("Failed to login");
    //   },
    // });
  };

  return (
    <>
      <div
        className={clsx([
          "p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
          "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
          "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 before:left-0 after:transform after:rotate-[-4.5deg] after:bg-[#F0FF5F] after:rounded-[100%] after:dark:bg-darkmode-700",
        ])}
      >
        <div className="container relative z-10 sm:px-10">
          <div className="block grid-cols-2 gap-4 xl:grid">
            {/* BEGIN: Login Info */}
            <div className="flex-col hidden min-h-screen xl:flex">
              <a
                href={paths.landingPage}
                className="flex items-center pt-5 -intro-x"
              >
                <IconLogo className="w-24 h-12 text-neutral-900" />
              </a>
              <div className="my-auto">
                <div className="w-1/2 -intro-x">
                  <Illustration className="w-full h-full" />
                </div>
                <div className="mt-10 text-4xl font-medium leading-tight text-neutral-900 -intro-x">
                  Sign in to your account.
                </div>
              </div>
            </div>
            {/* END: Login Info */}

            {/* BEGIN: Login Form */}
            <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
              <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                  Sign In
                </h2>
                <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
                  A few more clicks to sign in to your account. Manage all your
                  tennis club in one place
                </div>

                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(goLogin)}>
                    <div className="mt-8 intro-x">
                      <Controller
                        name="username"
                        control={methods.control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="username"
                            placeholder="Email"
                            autoComplete="email"
                            className="block px-4 py-3 intro-x min-w-full xl:min-w-[350px]"
                          />
                        )}
                      />
                      <Controller
                        name="password"
                        control={methods.control}
                        render={({ field }) => (
                          <Input.Password
                            {...field}
                            placeholder="Password"
                            autoComplete="current-password"
                            className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                          />
                        )}
                      />
                    </div>


                    <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                        disabled={methods.formState.isSubmitting || !methods.formState.isValid}
                      >
                        Login
                      </Button>
                      <Button
                        type="default"
                        className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
                        onClick={() => navigate(paths.registerPage)}
                      >
                        Register
                      </Button>
                    </div>
                  </form>
                </FormProvider>

                <div className="mt-10 text-center intro-x xl:mt-24 text-slate-600 dark:text-slate-500 xl:text-left">
                  By signing up, you agree to our{" "}
                  <a className="text-primary dark:text-slate-200" href="">
                    Terms and Conditions
                  </a>{" "}
                  &{" "}
                  <a className="text-primary dark:text-slate-200" href="">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
            {/* END: Login Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
