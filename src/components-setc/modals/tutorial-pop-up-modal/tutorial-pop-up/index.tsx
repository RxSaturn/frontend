import {
  Flex,
  ListItem,
  OrderedList,
  Text,
  Image,
} from "@chakra-ui/react";

import ChromePopUp1 from "@/assets/img/pop-up-tutorial/chrome/chrome-pop-up-1.webp"
import ChromePopUp2 from "@/assets/img/pop-up-tutorial/chrome/chrome-pop-up-2.webp"
import ChromePopUpMobile1 from "@/assets/img/pop-up-tutorial/chrome/chrome-pop-up-mobile-1.webp"
import FirefoxPopUp1 from "@/assets/img/pop-up-tutorial/firefox/firefox-pop-up-1.webp"
import FirefoxPopUp2 from "@/assets/img/pop-up-tutorial/firefox/firefox-pop-up-2.webp"


import { useState } from "react";
import ImageViewerModal from "../../image-viewer-modal";

type NavigatorName = "Firefox" | "Chrome";

type NavTutorialContent = {
  text: string;
  image?: string;
}

type NavTutorialOptions = {
  web: NavTutorialContent[];
  mobile: NavTutorialContent[];
}

type TutorialDataProps = {
  Firefox: NavTutorialOptions,
  Chrome: NavTutorialOptions,
}

const TutorialPopUp: React.FC = () => {
  const [isOpenImageViewerModal, setIsOpenImageViewerModal] = useState(false);
  const [image, setImage] = useState<string | undefined>();
  const device = screen.width < 640 || screen.height < 480 ? "mobile" : "web";

  const handlerOnShowImageViewer = (image: string) => {
    setImage(image);
    setIsOpenImageViewerModal(true);
  }

  const handlerOnCloseImageViewer = () => setIsOpenImageViewerModal(false);

  const getNavigatorName = (): NavigatorName => {
    const NOT_FOUND = -1;
    const navigatorKeys: NavigatorName[] = ["Firefox", "Chrome"];

    for (let index = 0; index < navigatorKeys.length; index++) {
      if (navigator.userAgent.indexOf(navigatorKeys[index]) > NOT_FOUND)
        return navigatorKeys[index];
    }

    return "Chrome";
  }

  const handlerOnTutorialSelection = () => {
    const navName = getNavigatorName();

    const tutorialData: TutorialDataProps = {
      Chrome: {
        web: [
          { text: "Clique no ícone de uma janela com um traço, localizado ao lado direito da barra de URL, que controla a exibição de pop-ups.", image: ChromePopUp1 },
          { text: "Marque a opção \"Sempre permitir popups e redirecionamento\" e clique em \"Concluir\"", image: ChromePopUp2 },
          { text: "Tente gerar o certificado novamente." },
        ],
        mobile: [
          { text: "Clique na opção \"Sempre mostrar\" para exibir o popup e tente novamente gerar o certificado.", image: ChromePopUpMobile1 },
        ]
      },
      Firefox: {
        web: [
          { text: "Clique no botão \"Opções\" que se encontra no topo da janela conforme mostra a seta na imagem abaixo.", image: FirefoxPopUp1 },
          { text: "Clique em \"Permitir que setc.com.br abra janelas ou abas\" e tente gerar o certificado novamente.", image: FirefoxPopUp2 }
        ],
        mobile: [
          { text: "Clique em \"Permitir\" e tente gerar o certificado novamente" }
        ]
      },
    }

    const tutorialContent: NavTutorialContent[] = tutorialData[navName][device];
    console.log(tutorialContent);

    return (
      <OrderedList>
        {tutorialContent.map((item, index) => {
          return (
            <ListItem key={`item-${index}`}>
              <Text textAlign="justify">{item.text}</Text>
              {item.image &&
                <>
                  <Image src={item.image} onClick={() => item.image && handlerOnShowImageViewer(item.image)} cursor="pointer" />
                  <ImageViewerModal image={image} isOpen={isOpenImageViewerModal} onClose={handlerOnCloseImageViewer} />
                </>
              }
            </ListItem>
          )
        })}
      </OrderedList>
    );
  }

  return (
    <Flex>
      {handlerOnTutorialSelection()}
    </Flex>
  )
}

export default TutorialPopUp;