import PropTypes from "prop-types";
export default Proptypes.shape({
  key: Proptypes.string.isRequired,
  name: Proptypes.string.isRequired,
  onClick: Proptypes.func
});
