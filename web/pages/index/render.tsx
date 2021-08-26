import DefaultLayout from "@/components/defaultLayout";
import React from "react";
import { SProps } from "ssr-types-react";

export default function Index(props: SProps) {
    return (
        <DefaultLayout>
            <div className="text-red-500 bg-white">123</div>
        </DefaultLayout>
    );
}
