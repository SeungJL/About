import Header from "../../components/Pages/About/AboutHeader";
import {
  PlazaBtnNav,
  PlazaLayout,
  PlazaMainContent,
} from "../../components/Pages/Plaza/plazaStyles";
import Seo from "../../components/common/Seo";
import PlazaBlock from "../../components/Pages/Plaza/PlazaBlock";
import { useRecoilState, useRecoilValue } from "recoil";
import { plazaCategoryState, plazaDataSelector } from "../../recoil/plazaAtoms";
import PlazaHeader from "../../components/Pages/Plaza/PlazaHeader";

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
