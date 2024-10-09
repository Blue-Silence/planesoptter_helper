var my_time_zone = new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2]

const formatTime = (t) => {
  return t ? ((new Date(t).toLocaleString()) + ` ${my_time_zone}`) :'N/A';
};

const weatherColor = (w) => {
  var color = null;
  if(!w) {
    color = '--el-color-info-light-3';
  }
  else if (w.text.includes('Sun') || w.text.includes('Clear')) {
    color = '--el-color-success-light-3';
  }
  else if (w.text.includes('Cloud') || w.text.includes('Overcast')) {
    color = '--el-color-warning-light-3';
  }
  else if (w.text.includes('Rain') || w.text.includes('Snow')) {
    color = '--el-color-danger-light-3';
  }
  else {
    color = '--el-color-info-light-7';
  }

  const color_n = getComputedStyle(document.documentElement)
  .getPropertyValue(color)
  .trim();
  console.log("Weather:", w," Name:",color," Color: ", color_n);
  //return --el-color-warning-light-9;
  return `${color_n}`;
  return `${color}`;
};


export default {
    formatTime,
    weatherColor
}