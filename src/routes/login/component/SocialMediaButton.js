import React from "react";
import SocialLogin from "react-social-login";

class SocialMediaButton extends React.Component {
  render() {
    const { children, triggerLogin, ...props } = this.props;
    return (
      <button onClick={triggerLogin} {...props}>
        {children}
      </button>
    );
  }
}

export default SocialLogin(SocialMediaButton);
