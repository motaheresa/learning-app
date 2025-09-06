import Providers from "./_providers/queruClientProvider";

export default function UserLayout({ children }) {
  return <Providers>{children}</Providers>;
}
