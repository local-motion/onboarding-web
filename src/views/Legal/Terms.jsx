import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import { withNamespaces } from "react-i18next";

import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


class Terms extends React.Component {

    render() {
    const { classes, ...rest } = this.props;
        return (
            <div className={classes.container}>

                <Header
                    brand={"Rookvrije generatie"}
                    brandLink={"/"}
                    rightLinks={<HeaderLinks/>}
                    fixed
                    color="white"
                    changeColorOnScroll={{
                        height: 50,
                        color: "white"
                    }}
                    {...rest}
                />

                <div className={classes.mainDown}>
                  <GridContainer className={"grid-container"}>
                    <GridItem xs={12} sm={12} md={6} className={classes.container}>
                        <h2>Terms of use</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar metus et turpis dictum, at lobortis quam sagittis. Sed finibus felis sed pulvinar gravida. Nullam eu placerat tellus, nec placerat est. Donec lacinia tortor eros, vitae varius dui placerat quis. Pellentesque eu metus ligula. Praesent venenatis mollis libero id volutpat. Praesent sit amet convallis ligula. Aliquam eget scelerisque sapien.</p>

                        <p>Donec lacinia massa sit amet vestibulum interdum. Ut sit amet nisi massa. Vestibulum elit nulla, ornare ut dapibus auctor, lobortis quis libero. Aenean quis efficitur orci. Ut ut eros quam. Morbi eget efficitur orci. Vestibulum felis sem, gravida et consequat et, convallis non est. In ipsum lacus, interdum nec tincidunt eget, viverra id nisi. Duis blandit vitae quam et ornare. Aliquam sed dolor ullamcorper, laoreet dui eu, gravida nibh. Suspendisse imperdiet, neque quis semper pulvinar, felis nisi bibendum nisi, non elementum diam turpis quis ipsum. Aenean sollicitudin eleifend ullamcorper. Mauris iaculis aliquet orci, non auctor ipsum finibus id. Morbi faucibus, est in fringilla luctus, nisi orci scelerisque ipsum, ut gravida odio felis a mauris. Nunc ac lacinia magna.</p>

                        <p>Curabitur commodo convallis ultrices. Etiam elit sem, hendrerit at congue ultrices, gravida non lorem. Nulla commodo suscipit est. Duis dictum odio nec volutpat ullamcorper. Quisque dignissim justo at purus interdum auctor. Suspendisse finibus accumsan elit, quis tempor urna egestas id. Pellentesque placerat, quam non convallis luctus, quam dolor pellentesque turpis, ultrices vehicula velit velit ut magna. Mauris ac eros commodo, euismod nibh consectetur, porttitor nibh. Phasellus quis nunc eget velit elementum facilisis. Nam convallis mi a metus vestibulum, sed vulputate velit imperdiet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p>

                        <p>Nunc aliquam leo eget ligula imperdiet pretium. In commodo tortor nec metus bibendum, nec gravida enim condimentum. Duis enim felis, maximus a maximus non, mollis ac nulla. Aliquam nec mauris dui. Curabitur vulputate eros ut pharetra sagittis. Ut id arcu ut arcu imperdiet sollicitudin id sed ipsum. Donec lacus nulla, commodo in eros quis, venenatis placerat tortor. Pellentesque faucibus sed leo et efficitur. Nam eleifend orci a semper rutrum. Curabitur in tempor purus. Duis ullamcorper ut felis in gravida.</p>

                        <p>Quisque placerat enim eu enim semper finibus. Sed porttitor vehicula pharetra. Curabitur porttitor sapien at faucibus faucibus. Maecenas leo neque, consectetur ac urna commodo, consequat rhoncus ligula. Vivamus imperdiet enim nec est rhoncus fermentum. Pellentesque pretium ac erat at viverra. Morbi est eros, accumsan in viverra euismod, finibus vitae ipsum. Integer posuere, nulla eu egestas ultrices, diam lorem congue ante, quis mollis turpis mauris ac ante. Pellentesque convallis, tellus ut efficitur rutrum, ex mi molestie turpis, ac condimentum nisi elit eget diam. Aenean nec aliquet diam. Duis mattis tellus vel arcu efficitur, nec feugiat sem molestie. Vestibulum faucibus, justo sit amet semper elementum, dolor neque eleifend arcu, vel dapibus erat purus quis dolor. Curabitur tempus sed ex nec finibus.</p>
                    </GridItem>
                  </GridContainer>
                </div>
                <Footer />
            </div>
    );
  }
}

export default withStyles(componentsStyle)(
    withNamespaces("translations")(Terms)
);
