import cn from "@/share/lib/cn";
import ButtonIcon from "@/share/ui/ButtonIcon";
import ButtonSmall from "@/share/ui/ButtonSmall";
import { useNavigate } from "react-router";

export default function TopbarLayout({
  sidebarOpen,
  isInWorld,
  toggleSidebar,
}: {
  sidebarOpen: boolean;
  isInWorld: boolean;
  toggleSidebar: () => void;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "pt-rd-8 pb-rd-8 w-rd-sidebar sidebarAnimation fixed top-0 left-0 z-50 flex items-center",
        !isInWorld && !sidebarOpen && "topbarClosed",
      )}
    >
      {isInWorld && (
        <ButtonSmall
          iconName={"move-left"}
          padded
          rounded
          color={"gray"}
          buttonProps={{ content: "돌아가기", onClick: () => navigate(-1) }}
        />
      )}

      <ButtonIcon
        className={cn("mr-rd-12 ml-auto")}
        iconName="columns-2"
        stroke={false}
        fill={false}
        onClick={toggleSidebar}
      />
    </div>
  );
}
