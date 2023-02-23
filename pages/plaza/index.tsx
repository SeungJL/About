import Header from "../../components/common/Header";
import {
  PlazaBtnNav,
  PlazaLayout,
  PlazaMainContent,
} from "../../components/Plaza/plazaStyles";
import Seo from "../../components/common/Seo";
import PlazaBlock from "../../components/Plaza/PlazaBlock";
import { useRecoilState, useRecoilValue } from "recoil";
import { plazaCategoryState, plazaDataSelector } from "../../recoil/plazaAtoms";
import PlazaHeader from "../../components/Plaza/PlazaHeader";

function Plaza() {
  const plazaData = useRecoilValue(plazaDataSelector);
  return (
    <>
      <Seo title="Plaza" />
      <Header title="소통의 광장" />
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
