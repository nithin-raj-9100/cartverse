import { useRouteError } from "react-router";
import { Link } from "react-router";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };

  const errorMessage =
    error?.statusText ||
    error?.message ||
    "Sorry, the page you're looking for doesn't exist or has been moved.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
      <Card className="w-full max-w-md border-red-200 shadow-lg dark:border-red-800">
        <CardHeader className="space-y-1 pb-2 text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            404
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
            Page Not Found
          </h2>
          <Alert
            variant="destructive"
            className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/50"
          >
            <AlertTitle className="font-medium">Error</AlertTitle>
            <AlertDescription className="text-sm">
              {errorMessage}
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 pb-6 pt-2">
          <Button
            asChild
            variant="default"
            size="lg"
            className="max-w-[180px] flex-1"
          >
            <Link to="/">Go Back Home</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="max-w-[180px] flex-1"
          >
            <Link to="/products">Go to Products</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
