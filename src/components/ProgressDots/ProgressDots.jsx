import React from 'react'
import PropTypes from 'prop-types'

import { styled, css, keyframes }from '../../styled'
import { styles } from '../../styles'

const glow = keyframes`
	0%, 100% { opacity: 1; }
	50% { opacity: .4; }
`

const sizes = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10
};

const StyledProgressDots = styled.div`
  display: inline-block;
  line-height: 1;
  font-size: ${(props) => sizes[props.size] || props.size}px;
`;

const Dot = styled.div`
  background: ${styles.color.medium};
  display: inline-block;
  vertical-align: top;
  width: ${(props) => sizes[props.size] || props.size}px;
  height: ${(props) => sizes[props.size] || props.size}px;
  border-radius: 3em;
  margin: 0 ${(props) => (sizes[props.size] || props.size) * 0.5}px;

  ${({ active }) => active && css`
    background: ${styles.color.mediumdark};
  `};

  ${({ loading }) => loading && css`
    animation: ${glow} 1.5s ease-in-out infinite;

    &:nth-child(1) {
    animation-delay: 0s;
    }

    &:nth-child(2) {
      animation-delay: 0.3s;
    }

    &:nth-child(3) {
      animation-delay: 0.6s;
    }

    &:nth-child(4) {
      animation-delay: 0.9s;
    }
  `};
`;



const ProgressDots = ({
  loading,
  dots,
  progress,
  size,
  ...props
}) => {
  const isLoading = () => {
    if (props.isLoading) {
      return props.isLoading
    }

    return loading
  }

  const getDots = () => {
    if (props.steps) {
      return props.steps
    }

    return dots
  }

  const dotsArray = [];
  for (let i = 0; i < getDots(); i += 1) {
    dotsArray.push(<Dot loading={isLoading()} active={i === progress - 1} key={i} size={size} />);
  }

  return (
    <StyledProgressDots size={size} {...props}>
      {dotsArray}
    </StyledProgressDots>
  )
}

ProgressDots.propTypes = {
  loading: PropTypes.bool,
  dots: PropTypes.number,
  progress: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};

ProgressDots.defaultProps = {
  loading: false,
  dots: 4,
  progress: 0,
  size: 'sm',
}

export default ProgressDots
