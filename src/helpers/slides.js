import VariantSofaDonateSvg from '../components/svgComponents/VariantSofaDonate';
import VariantTapSvg from '../components/svgComponents/VariantTap';
import VariantConnectionsSvg from '../components/svgComponents/VariantConnections';

import EffortlessDonationsSvg from '../components/svgComponents/EffortlessDonationsSvg';
import ResponsibleMonitoringSvg from '../components/svgComponents/ResponsibleMonitoringSvg';
import SecureProcessingSvg from '../components/svgComponents/SecureProcessingSvg';

const useSlides = (t) => {
  return [
  {
    imgSrc: VariantTapSvg(),
    headerText: t("slides.slide1.header"),
    bodyText: t("slides.slide1.body"),
  },
  {
    imgSrc: VariantSofaDonateSvg(),
    headerText: t("slides.slide2.header"),
    bodyText: t("slides.slide2.body"),
  },
  {
    imgSrc: VariantConnectionsSvg(),
    headerText: t("slides.slide3.header"),
    bodyText: t("slides.slide3.body"),
  },
    ]
};

const useHowItWorkSlides = (t) =>
{
    return [
        {
            imgSrc: EffortlessDonationsSvg(),
            headerText: t("slides.slide1.header"),
            bodyText: t("slides.slide1.body"),
        },
        {
            imgSrc: ResponsibleMonitoringSvg(),
            headerText: t("slides.slide2.header"),
            bodyText: t("slides.slide2.body"),
        },
        {
            imgSrc: SecureProcessingSvg(),
            headerText: t("slides.slide3.header"),
            bodyText: t("slides.slide3.body"),
        },
    ]
};

export { useSlides, useHowItWorkSlides };