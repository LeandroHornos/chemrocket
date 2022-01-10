import React, { useEffect, useState } from "react";
import { Kekule } from "kekule";

// import Kekule from "kekule";
import Modal from "./Modal";
import useWindowSize from "../hooks/useWindowSize";
import useFullScreen from "../hooks/useFullScreen";

import {
  BsFillPhoneFill,
  BsFillPhoneLandscapeFill,
  BsArrowRepeat,
} from "react-icons/bs";

import PropTypes from "prop-types";

const KekuleComposer = (props) => {
  // Pass this functions via props from the parent component
  // to get the composer content and perform actions with it
  const { getContent, getMolecules, getSelected } = props;

  // Kekule composer
  const composerCont = React.createRef();
  const [composer, setComposer] = useState(null);

  // Screen management Hooks & state
  const [width, height] = useWindowSize();
  const fs = useFullScreen();
  const [showModal, setShowModal] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const showComposer = () => {
      const comp = new Kekule.Editor.Composer(composerCont.current);
      comp.setCommonToolButtons([
        "newDoc",
        "loadData",
        "saveData",
        "undo",
        "redo",
        "copy",
        "cut",
        "paste",
        "zoomIn",
        "reset",
        "zoomOut",
      ]);
      comp.setDimension("95%", "90vh");

      setComposer(comp);
    };

    showComposer();
    // eslint-disable-next-line
  }, []);

  // SCREEN MANAGEMENT

  useEffect(() => {
    // Condicion para mostrar el Modal
    const breakpoint = 500;
    const mustShowModal = (width < breakpoint) & (width < height);
    if (mustShowModal) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [width, height]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    console.log("cambiando fullscreen", fs);
    setFullscreen(fs);
  }, [fs]);

  function toggleFullScreen() {
    if (!fullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  // COMPOSER FUNCTIONALITY

  const returnContent = () => {
    /* This method returns the content of the
    composer and passes it to a function recieved
    by props that does something with de content */

    const content = composer.getChemObj();
    // convert chemObject to kekule-json in order to store it somewhere
    const molJson = Kekule.IO.saveFormatData(content, "Kekule-JSON");
    // let's regenerate chemObject from kekule-JSON
    const newContent = Kekule.IO.loadFormatData(molJson, "Kekule-JSON");
    // And load the object into the editor again
    composer.setChemObj(newContent);
    /** */
    getContent(content);
  };

  const loadKekuleJson = (molJson) => {
    // Use this function to load stored content into the composer
    const newContent = Kekule.IO.loadFormatData(molJson, "Kekule-JSON");
    composer.setChemObj(newContent);
  };

  const returnMolecules = () => {
    /* This method returns an array containing
    the molecules drawn on the composer and passes 
    it to a function recieved  by props that does 
    something with de content */

    let mols = composer.exportObjs(Kekule.Molecule);
    mols = mols.map((mol) => {
      return {
        object: mol,
        smiles: Kekule.IO.saveFormatData(mol, "smi"),
        mol: Kekule.IO.saveFormatData(mol, "mol"),
        cml: Kekule.IO.saveFormatData(mol, "cml"),
      };
    });
    console.log("mols", mols);
    getMolecules(mols);
  };

  const returnSelected = () => {
    /* This method returns an object with the
    selected elements in the composer */

    // const { getSelected } = props
    const content = composer.getSelection();
    console.log("Contenido seleccionado:", content);
    getSelected(content);
  };

  const returnComposerPngImage = () => {
    var image_data = composer.getEditor().exportToDataUri();
    console.log("imagen", image_data);
  };

  return (
    <React.Fragment>
      <div className="row m-0">
        <div className="col-12 p-0">
          <div className="custom-menu bg-texture d-flex align-items-center justify-content-center p-1">
            <button
              class="btn btn-sm custom-menu-btn shadow-sm shadow-intensity-lg m-1 mt-2 mb-0"
              type="button"
              onClick={toggleFullScreen}
            >
              {fullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
            </button>

            <button
              className="btn btn-sm custom-menu-btn shadow-sm shadow-intensity-lg m-1 mt-2 mb-0"
              type="button"
              onClick={returnContent}
            >
              Obtener contenido
            </button>
            <button
              className="btn btn-sm custom-menu-btn shadow-sm shadow-intensity-lg m-1 mt-2 mb-0"
              type="button"
              onClick={returnSelected}
            >
              Obtener selección
            </button>
            <button
              className="btn btn-sm custom-menu-btn shadow-sm shadow-intensity-lg m-1 mt-2 mb-0"
              type="button"
              onClick={returnMolecules}
            >
              Obtener moléculas
            </button>
            <button
              className="btn btn-sm custom-menu-btn shadow-sm shadow-intensity-lg m-1 mt-2 mb-0"
              type="button"
              onClick={returnComposerPngImage}
            >
              Obtener imagen
            </button>
          </div>
          <Modal
            show={showModal}
            handleClose={handleCloseModal}
            allowClosing={false}
          >
            <div
              className="row w-100 h-100"
              style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
            >
              <div className="col-12 w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                <img src="./android-chrome-192x192.png" alt="rocket icon" />
                <p className="text-center" style={{ color: "rgb(25,150,180)" }}>
                  Gira el dispositivo hacia la posición{" "}
                  <strong>horizontal</strong> para usar el editor de moléculas
                </p>

                <BsFillPhoneFill size={60} color="rgba(25,150,180, 0.3)" />
                <BsArrowRepeat size={60} color="rgb(150,150,150)" />
                <BsFillPhoneLandscapeFill size={60} color="rgb(25,200,180)" />
              </div>
            </div>
          </Modal>
          <div className="composer-container bg-texture">
            {/* zIndex: when you go fullscreen menus won't show
            unless you raise the component's z-index */}
            <div
              ref={composerCont}
              className="shadow shadow-intensity-lg"
              style={{ zIndex: "100" }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

KekuleComposer.propTypes = {
  getContent: PropTypes.func,
  getMolecules: PropTypes.func,
  getSelected: PropTypes.func,
};

KekuleComposer.defaultProps = {
  getContent: (data) => {},
  getMolecules: (data) => {},
  getSelected: (data) => {},
};

export default KekuleComposer;
