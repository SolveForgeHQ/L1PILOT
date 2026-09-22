import type { Metadata } from "next";
import { ConfigurationsClient } from "@/components/configurations/configurations-client";

export const metadata: Metadata = {
  title: "My Configurations",
  description:
    "View, copy, download, and manage your saved Genesis and Node configuration files.",
};

export default function ConfigurationsPage() {
  return <ConfigurationsClient />;
}
