import styled from "styled-components";
import { Size } from "../../types2/assetTypes";
import IconLinkTile, { IIconLinkTile } from "../atoms/IconLinkTile";

interface IIconTileRowLayout {
  tileDataArr: IIconLinkTile[];
  size?: Size;
}
export default function IconTileRowLayout({
  tileDataArr,
  size,
}: IIconTileRowLayout) {
  return (
    <div className="flex justify-between bg-8 pt-4 pb-3 px-6">
      {tileDataArr.map((tile, idx) => (
        <IconLinkTile
          key={idx}
          url={tile.url}
          text={tile.text}
          icon={tile.icon}
          func={tile.func}
          size={size}
        />
      ))}
    </div>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  padding-top: 16px;
  padding-bottom: 12px;
`;
