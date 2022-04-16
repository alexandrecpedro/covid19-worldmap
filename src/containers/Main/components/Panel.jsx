import React, { memo } from "react";
import RefreshIcon from "../../../assets/images/refresh.svg";
import {
  Card,
  Typography,
  Button,
  Select,
  MenuItem,
} from "../../../components";
import COUNTRIES from "../../../commons/constants/countries";
import { CardPanelContentStyled, ItemStyled } from "./style";

const navigatorHasShare = navigator.share;

function Panel({ updateAt, onChange, data, country, getCoviddata }) {
  const { cases, recovered, deaths, todayCases, todayDeaths } = data;

  const renderCountries = (country, index) => (
    <MenuItem key={`country-${index}`} value={country.value}>
      <ItemStyled>
        <div>{country.label}</div>
        <img src={country.flag} alt={`Country-${country.label}`} />
      </ItemStyled>
    </MenuItem>
  );

  const textCovid19 = `Country: ${country} - recovered: ${recovered}`;

  const copyInfo = () => {
    navigator.clipboard.writeText(textCovid19);
  };

  const shareInfo = () => {
    navigator.share({
      title: `Covid19 data - ${country}`,
      text: textCovid19,
      url: "https://covid19dio.netlify.app/",
    });
  };

  const renderShareButton = (
    <div>
      <Button variant="contained" color="primary" onClick={shareInfo}>
        Share
      </Button>
    </div>
  );

  const renderCopyButton = (
    <div>
      <Button variant="contained" color="primary" onClick={copyInfo}>
        Copy
      </Button>
    </div>
  );

  return (
    <Card>
      <CardPanelContentStyled>
        <div>
          <Typography variant="h5" component="span" color="primary">
            COVID-19
          </Typography><br/>
          <Typography variant="h6" component="span" color="primary">
            Coronavirus Panel
          </Typography><br/>
          <Typography variant="body2" component="span" color="primary">
            Updated at: {updateAt}
          </Typography><br/><br/>
          <div className="pt-2">
            <Select onChange={onChange} value={country}>
              {COUNTRIES.map(renderCountries)}
            </Select>
          </div>
        </div>
        {navigatorHasShare ? renderShareButton : renderCopyButton}
      </CardPanelContentStyled>
    </Card>
  );
}

export default memo(Panel);
