import Seo from "../../components/common/Seo";

import { useRecoilState, useRecoilValue } from "recoil";
import { plazaCategoryState, plazaDataSelector } from "../../recoil/plazaAtoms";
import {
  PlazaLayout,
  PlazaMainContent,
} from "../../pagesComponents/Plaza/plazaStyles";
import PlazaHeader from "../../pagesComponents/Plaza/PlazaHeader";
import PlazaBlock from "../../pagesComponents/Plaza/PlazaBlock";

function Plaza() {
  const plazaData = useRecoilValue(plazaDataSelector);
  return (
    <>
      <Seo title="Plaza" />
      {/* <Header title="소통의 광장" /> */}
      <PlazaLayout>
        <PlazaHeader />
        <PlazaMainContent>
          {plazaData.map((data) => (
            <PlazaBlock key={data.id} data={data} />
          ))}
        </PlazaMainContent>
      </PlazaLayout>
    </>
  );
}

export default Plaza;
