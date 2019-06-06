import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Check from "@material-ui/icons/Check";
import withStyles from "@material-ui/core/styles/withStyles";

import { isUserManagerOfPlayground } from "../../../components/Playground/PlaygroundReducer";

const dateToString = date => {
    let year = date.getFullYear();
    let monthPadded = ("0" + (date.getMonth() + 1)).slice(-2);
    let dayPadded = ("0" + date.getDate()).slice(-2);

    return year + "-" + monthPadded + "-" + dayPadded;
};

const styles = theme => ({
    datePickerWrapper: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '& > div:first-child': {
            width: 0,
            height: 0,
        },
        '& > button': {
            flexGrow: 1,
        },
    },
    dialogContent: {
        padding: 0,
        paddingTop: 0,
    },
    datePicker: {
        float: 'unset',
    },
});

const PickIntroductionDateButton = ({ classes, playground, user, setSmokefreeDate }) => {
    const [isOpen, toggle] = useState(false);

    const date = playground.smokeFreeDate || new Date();
    const userIsManager = isUserManagerOfPlayground(user, playground);

    const disabled = !userIsManager || playground.status === "NOT_STARTED";

    function selectDate(date) {
        setSmokefreeDate(playground.id, dateToString(date));
        handleClose();
    }

    function handleClose() {
        toggle(false);
    }

    return (
      <div>
          <div className={classes.datePickerWrapper}>
              <Dialog
                open={isOpen}
                aria-labelledby="date-picker"
                onClose={handleClose}
              >
                  <DialogContent
                    className={classes.dialogContent}
                  >
                      <DatePicker
                        disabled={disabled}
                        dateFormat="dd-MM-YYYY"
                        selected={date}
                        onChange={selectDate}
                        withPortal
                        inline
                        calendarClassName={classes.datePicker}
                        onClickOutside={handleClose}
                      />
                  </DialogContent>
              </Dialog>

              <Button
                variant="contained"
                className={`pagination-button-step${playground.smokeFreeDate ? '-done' : ''}`}
                onClick={() => toggle(true)}
                disabled={disabled}
              >
                  {
                      playground.smokeFreeDate
                        ? (
                          <React.Fragment>
                              {dateToString(playground.smokeFreeDate)}
                              <Check className={classes.ctaDone} />
                          </React.Fragment>
                        )
                        : "Kies een geschikt moment"
                  }
              </Button>
          </div>
      </div>
    );
};

export default withStyles(styles)(PickIntroductionDateButton);