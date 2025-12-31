import * as React from "react";

export default function Home() {
  const [x, setX] = React.useState<number>(0);
  return <h1 className="text-4xl">Home</h1>;
}
