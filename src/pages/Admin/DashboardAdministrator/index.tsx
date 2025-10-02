import clsx from "clsx";
import { useState } from "react";

import { GeneralReportApiHooks } from "./api";
import {
  ReloadOutlined, UpOutlined,
  TeamOutlined,
  ShoppingCartOutlined, ApartmentOutlined,
  ShoppingOutlined
} from "@ant-design/icons";

function Main() {
  const [salesReportFilter, setSalesReportFilter] = useState<string>();

  const { data, isLoading, refetch } = GeneralReportApiHooks.useGetGeneralReport();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 2xl:col-span-9">
        <div className="grid grid-cols-12 gap-6">
          {/* BEGIN: General Report */}
          <div className="col-span-12 mt-8">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                Inventory Report
              </h2>
              <a href="#" onClick={() => refetch()} className="flex items-center ml-auto text-primary">
                <ReloadOutlined className="mr-2" /> Reload Data
              </a>
            </div>

            <div className="grid grid-cols-12 gap-6 mt-5">
              {/* Matches */}
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-['']",
                  ])}
                >
                  <div className="p-5 box">
                    <div className="flex">
                      <ShoppingOutlined className="text-primary text-xl" />
                      <div className="ml-auto flex items-center">
                        {Intl.NumberFormat().format(
                          data?.approved || 0
                        )}
                        <UpOutlined className="ml-1 text-green-500" />
                      </div>
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {Intl.NumberFormat().format(
                        data?.approved || 0
                      )}
                    </div>
                    <div className="mt-1 text-base text-slate-500">Approved</div>
                  </div>
                </div>
              </div>

              {/* Tournaments */}
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-['']",
                  ])}
                >
                  <div className="p-5 box">
                    <div className="flex">
                      <ApartmentOutlined className="text-pending text-xl" />
                     
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {Intl.NumberFormat().format(
                        data?.available || 0
                      )}
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Available
                    </div>
                  </div>
                </div>
              </div>

              {/* Players */}
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-['']",
                  ])}
                >
                  <div className="p-5 box">
                    <div className="flex">
                      <TeamOutlined className="text-warning text-xl" />
                      
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {Intl.NumberFormat().format(
                        data?.delivered || 0
                      )}
                    </div>
                    <div className="mt-1 text-base text-slate-500">Delivered</div>
                  </div>
                </div>
              </div>

              {/* Orders */}
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-['']",
                  ])}
                >
                  <div className="p-5 box">
                    <div className="flex">
                      <ShoppingCartOutlined className="text-warning text-xl" />
                      
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {Intl.NumberFormat("id-ID").format(
                        data?.place || 0
                      )}
                    </div>
                    <div className="mt-1 text-base text-slate-500">
                      Place
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: General Report */}
        </div>
      </div>

      {/* Right Side - Schedules */}
      <div className="col-span-12 2xl:col-span-3">
        <div className="pb-10 -mb-10 2xl:border-l">
          <div className="grid grid-cols-12 2xl:pl-6 gap-x-6 2xl:gap-x-0 gap-y-6 mt-4">
            <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12">
              <div className="flex items-center h-10 intro-x">
                <h2 className="mr-5 text-lg font-medium truncate">Pending Orders</h2>
              </div>
              <div className="mt-5 flex flex-col items-start">
                <span className="text-xl font-bold text-end">{Intl.NumberFormat("id-ID").format(data?.pending || 0)}</span>
                <span className="text-xs text-slate-500">Orders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
