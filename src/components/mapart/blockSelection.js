import React, { Component } from "react";

import coloursJSON from "./coloursJSON.json";
import Tooltip from "../tooltip";

import MapModes from "./json/mapModes.json";
import StaircaseModes from "./json/staircaseModes.json";
import SupportedVersions from "./json/supportedVersions.json";

import IMG_Null from "../../images/null.png";
import IMG_Textures from "../../images/textures.png";

import "./blockSelection.css";

class BlockSelection extends Component {
  cssRGB(RGBArray) {
    // RGB array to css compatible string
    return `rgb(${RGBArray.join(", ")})`;
  }

  render() {
    const {
      getLocaleString,
      onChangeColourSetBlock,
      optionValue_version,
      optionValue_modeNBTOrMapdat,
      optionValue_staircasing,
      optionValue_unobtainable,
      selectedBlocks,
      presets,
      selectedPresetName,
      onPresetChange,
      onDeletePreset,
      onSavePreset,
      onSharePreset,
      onGetPDNPaletteClicked,
    } = this.props;
    const presetsManagement = (
      <React.Fragment>
        <h2 id="blockselectiontitle">{getLocaleString("BLOCK-SELECTION/TITLE")}</h2>
        <b>
          {getLocaleString("BLOCK-SELECTION/PRESETS/TITLE")}
          {":"}
        </b>{" "}
        <select id="presets" value={selectedPresetName} onChange={onPresetChange}>
          <option value="None">{getLocaleString("BLOCK-SELECTION/PRESETS/NONE")}</option>
          {presets.map((preset) => (
            <option value={preset.name} key={preset.name}>
              {"localeKey" in preset ? getLocaleString(preset.localeKey) : preset.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={onDeletePreset}>
          {getLocaleString("BLOCK-SELECTION/PRESETS/DELETE")}
        </button>
        <button type="button" onClick={onSavePreset}>
          {getLocaleString("BLOCK-SELECTION/PRESETS/SAVE")}
        </button>
        <Tooltip tooltipText={getLocaleString("BLOCK-SELECTION/PRESETS/SHARE-TT")}>
          <button type="button" onClick={onSharePreset}>
            {getLocaleString("BLOCK-SELECTION/PRESETS/SHARE")}
          </button>
        </Tooltip>
        <Tooltip tooltipText={getLocaleString("BLOCK-SELECTION/PRESETS/DOWNLOAD-TT")}>
          <button type="button" onClick={onGetPDNPaletteClicked}>
            {getLocaleString("BLOCK-SELECTION/PRESETS/DOWNLOAD")}
          </button>
        </Tooltip>
      </React.Fragment>
    );
    const blockSelection = (
      <React.Fragment>
        {Object.entries(coloursJSON)
          .filter(([, colourSet]) => Object.values(colourSet.blocks).some((block) => Object.keys(block.validVersions).includes(optionValue_version.MCVersion)))
          .map(([colourSetId, colourSet]) => (
            <div key={colourSetId} className="colourSet">
              <div
                className="colourSetBox"
                style={{
                  background:
                    optionValue_staircasing === StaircaseModes.OFF.uniqueId
                      ? this.cssRGB(colourSet.tonesRGB.normal)
                      : optionValue_modeNBTOrMapdat === MapModes.SCHEMATIC_NBT.uniqueId || !optionValue_unobtainable
                      ? `linear-gradient(${this.cssRGB(colourSet.tonesRGB.dark)} 33%, ${this.cssRGB(colourSet.tonesRGB.normal)} 33%, ${this.cssRGB(
                          colourSet.tonesRGB.normal
                        )} 66%, ${this.cssRGB(colourSet.tonesRGB.light)} 66%)`
                      : `linear-gradient(${this.cssRGB(colourSet.tonesRGB.unobtainable)} 25%, ${this.cssRGB(colourSet.tonesRGB.dark)} 25%, ${this.cssRGB(
                          colourSet.tonesRGB.dark
                        )} 50%, ${this.cssRGB(colourSet.tonesRGB.normal)} 50%, ${this.cssRGB(colourSet.tonesRGB.normal)} 75%, ${this.cssRGB(
                          colourSet.tonesRGB.light
                        )} 75%)`,
                }}
              />
              <label>
                <Tooltip tooltipText={getLocaleString("NONE")}>
                  <img
                    src={IMG_Null}
                    alt={getLocaleString("NONE")}
                    className={selectedBlocks[colourSetId] === "-1" ? "cursorPointer blockImage blockImage_selected" : "cursorPointer blockImage"}
                    style={{
                      backgroundImage: `url(${IMG_Textures})`,
                      backgroundPositionX: "-100%",
                      backgroundPositionY: "-6400%",
                    }}
                    onClick={() => onChangeColourSetBlock(colourSetId, "-1")}
                  />
                </Tooltip>
              </label>
              <div className={"colourSetBlocks"}>
                {Object.entries(colourSet.blocks)
                  .filter(([, block]) => Object.keys(block.validVersions).includes(optionValue_version.MCVersion))
                  .map(([blockId, block]) => (
                    <label key={blockId}>
                      <Tooltip tooltipText={block.displayName}>
                        {selectedBlocks[colourSetId] === blockId &&
                          !(Object.values(SupportedVersions)[Object.keys(SupportedVersions).length - 1].MCVersion in block.validVersions) && (
                            // if doesn't support latest version
                            <div
                              style={{
                                position: "absolute",
                                paddingLeft: "28px",
                                zIndex: 110,
                              }}
                            >
                              <Tooltip
                                tooltipText={`${getLocaleString("BLOCK-SELECTION/UNSUPPORTED-PAST")} ${
                                  Object.keys(block.validVersions)[Object.keys(block.validVersions).length - 1]
                                }`}
                                textStyleOverrides={{
                                  whiteSpace: "nowrap",
                                  backgroundColor: "red",
                                }}
                              >
                                <h2 style={{ backgroundColor: "red", margin: "0" }}>{"!"}</h2>
                              </Tooltip>
                            </div>
                          )}
                        <img
                          src={IMG_Null}
                          alt={block.displayName}
                          className={selectedBlocks[colourSetId] === blockId ? "cursorPointer blockImage blockImage_selected" : "cursorPointer blockImage"}
                          style={{
                            backgroundImage: `url(${IMG_Textures})`,
                            backgroundPositionX: `-${blockId}00%`,
                            backgroundPositionY: `-${colourSetId}00%`,
                          }}
                          onClick={() => onChangeColourSetBlock(colourSetId, blockId)}
                        />
                      </Tooltip>
                    </label>
                  ))}
              </div>
            </div>
          ))}
      </React.Fragment>
    );
    return (
      <div className="section blockSelectionDiv">
        {presetsManagement}
        {blockSelection}
      </div>
    );
  }
}

export default BlockSelection;
