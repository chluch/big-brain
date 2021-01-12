import React from 'react';
import PropTypes from 'prop-types';

const ImagePreview = ({ file, alt, style }) => (
  <img
    src={file}
    alt={alt}
    style={{ ...style }}
  />
);

ImagePreview.propTypes = {
  file: PropTypes.string,
  alt: PropTypes.string,
  style: PropTypes.shape({
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

ImagePreview.defaultProps = {
  file: '',
  alt: '',
  style: {
    height: 'auto',
    width: '150px',
  },
};

export default ImagePreview;
