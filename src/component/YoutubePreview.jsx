import React from 'react';
import PropTypes from 'prop-types';

const YoutubePreview = ({
  youtubeUrl, width, height, autoplay,
}) => {
  const isUrl = youtubeUrl.match(/^(http|https):\/\/www\.youtube\.com*/);
  if (!isUrl) {
    return null;
  }
  let embedUrl = youtubeUrl.replace('watch?v=', 'embed/');
  if (autoplay) {
    embedUrl = embedUrl.concat('?&mute=1&autoplay=1'); // Allow autoplay, muted for sanity
  }
  return (
    <iframe
      title="youtube-video"
      width={width}
      height={height}
      src={embedUrl}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

YoutubePreview.propTypes = {
  youtubeUrl: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  autoplay: PropTypes.bool,
};

YoutubePreview.defaultProps = {
  youtubeUrl: '',
  width: '320',
  height: '180',
  autoplay: false,
};

export default YoutubePreview;
