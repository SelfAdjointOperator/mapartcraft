import React, { Component } from "react";

import coloursJSON from "../coloursJSON.json";

import SupportedVersions from "../json/supportedVersions.json";

import "./blockSelectionAddCustom.css";

class BlockSelectionAddCustom extends Component {
  state = {
    selectedColourSetId: Object.keys(coloursJSON)[0],
  };

  onSelectedColourSetIdChange = (e) => {
    this.setState({ selectedColourSetId: e.target.value });
  };

  render() {
    const { getLocaleString } = this.props;
    const { selectedColourSetId } = this.state;
    return (
      <details className="blockSelectionAddCustom">
        <summary>{getLocaleString("BLOCK-SELECTION/ADD-CUSTOM/TITLE")}</summary>
        <table>
          <tbody>
            <tr>
              <th>
                <b>
                  {getLocaleString("BLOCK-SELECTION/ADD-CUSTOM/BLOCK-NAME")}
                  {":"}
                </b>{" "}
              </th>
              <td>
                {"minecraft:"}
                <input
                  type="text"
                  // value={preProcessingValue_brightness}
                  // onChange={onOptionChange_PreProcessingBrightness}
                  // disabled={!optionValue_preprocessingEnabled}
                />
              </td>
            </tr>
            <tr>
              <th>
                <b>
                  {getLocaleString("BLOCK-SELECTION/ADD-CUSTOM/COLOUR-SET")}
                  {":"}
                </b>{" "}
              </th>
              <td>
                <select
                  value={selectedColourSetId}
                  onChange={this.onSelectedColourSetIdChange}
                  style={{ backgroundColor: `rgb(${coloursJSON[selectedColourSetId].tonesRGB.normal.join(", ")})` }}
                >
                  {Object.entries(coloursJSON).map(([colourSetId, colourSet]) => (
                    <option key={colourSetId} value={colourSetId} style={{ backgroundColor: `rgb(${colourSet.tonesRGB.normal.join(", ")})` }}>
                      {colourSet.colourName}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>
                <b>
                  {getLocaleString("BLOCK-SELECTION/ADD-CUSTOM/NEEDS-SUPPORT")}
                  {":"}
                </b>{" "}
              </th>
              <td>
                <input
                  type="checkbox"
                  // checked={optionValue_showGridOverlay}
                  // onChange={onOptionChange_showGridOverlay}
                />
              </td>
            </tr>
            <tr>
              <th>
                <b>
                  {getLocaleString("BLOCK-SELECTION/ADD-CUSTOM/FLAMMABLE")}
                  {":"}
                </b>{" "}
              </th>
              <td>
                <input
                  type="checkbox"
                  // checked={optionValue_showGridOverlay}
                  // onChange={onOptionChange_showGridOverlay}
                />
              </td>
            </tr>
            <tr>
              <th>
                <b>
                  {getLocaleString("BLOCK-SELECTION/ADD-CUSTOM/VERSIONS")}
                  {":"}
                </b>{" "}
              </th>
              <td>
                {Object.values(SupportedVersions).map((supportedVersion) => (
                  <React.Fragment key={supportedVersion.MCVersion}>
                    <input
                      type="checkbox"
                      // checked={optionValue_showGridOverlay}
                      // onChange={onOptionChange_showGridOverlay}
                    />
                    {supportedVersion.MCVersion}
                  </React.Fragment>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </details>
    );
  }
}

export default BlockSelectionAddCustom;
