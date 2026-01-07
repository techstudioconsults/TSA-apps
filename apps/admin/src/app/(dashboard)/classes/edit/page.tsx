"use client";

import { Suspense } from "react";
import EditClassForm from "./_views/EditClassForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading class details...</div>}>
      <EditClassForm />
    </Suspense>
  );
}
