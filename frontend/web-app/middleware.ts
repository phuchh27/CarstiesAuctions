export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/session"],
  page: {
    signIn: "/api/auth/signin"
  }
};
