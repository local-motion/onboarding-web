import React, { Component } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Checkbox from '@material-ui/core/Checkbox';
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import WorkspaceCard from "../../../components/CustomCard/WorkspaceCard";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
    content: {
        display: 'flex',
        borderBottom: '1px solid #e7e7e7',
        margin: '0 -27px',
    },
    title: {
        color: '#ec2e52',
        fontSize: 28,
        lineHeight: 1.2,
        fontFamily: 'dk_black_bamboo-webfont',
    },
    donation: {
        flexBasis: '35%',
        display: 'flex',
        alignItems: 'center',
        justifyCenter: 'center',
        flexDirection: 'column',
        borderRight: '1px solid #e7e7e7',
        paddingBottom: 20,
    },
    totalSum: {
        color: '#085ca6',
        fontSize: 44,
        lineHeight: 1.2,
    },
    totalSubtitle: {
        color: '#626262',
        fontSize: 18,
        lineHeight: 1.5,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    donateButton: {
        background: '#eb621b',
        overflow: 'hidden',
        padding: 0,
        boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',

        '&:hover $donateText': {
            color: '#FFF',
            background: '#ef8149',
        },

        '&:hover': {
            background: '#eb621b',
        },
    },
    donateIcon: {
        margin: 12,
    },
    donateText: {
        background: '#FFF',
        color: '#626262',
        fontSize: 14,
        fontWeight: 'bold',
        padding: 12,
        width: 140,
    },
    description: {
        flex: 1,
        padding: '0 20px 20px',
    },
    listItem: {
        color: '#626262',
        fontSize: 16,
        lineHeight: 1.5,
        fontWeight: 600,
    },
    text: {
        color: '#626262',
        fontSize: 14,
    },
    formControl: {
        minWidth: 120,
    },
    fieldName: {
        color: '#085ca6',
        fontSize: 16,
        lineHeight: 1.875,
        fontWeight: 600,
        margin: '20px 0 10px',
        textAlign: 'center',
    },
    donationsTitle: {
        color: '#085ca6',
        fontSize: 26,
        lineHeight: 1.2,
        fontFamily: 'dk_black_bamboo-webfont',
    },
    donationsTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '20px 0 25px'
    },
    donationsButtons: {},
    donationButton: {
        border: '1px solid #a1a1a1',
        padding: '10px 20px',
        background: '#FFF',
        color: '#085ca6',
        fontSize: 13,
        fontWeight: 'bold',
        lineHeight: 1.2,
        borderRadius: 0,

        '&:first-child': {
            borderRight: 'none',
            borderRadius: '5px 0 0 5px',
        },
        '&:last-child': {
            borderLeft: 'none',
            borderRadius: '0 5px 5px 0',
        },

        '&:hover': {
            background: '#FFF',
        },
    },
    donationActive: {
        background: '#085ca6',
        color: '#FFF',

        '&:hover': {
            background: '#085ca6',
        }
    },
    tableRow: {
        height: 35,
    },
    tableHeaders: {
        color: '#085ca6',
    },
    row: {
        color: '#626262',
        fontSize: 14,

        '&:nth-of-type(odd)': {
            backgroundColor: '#f6fafd',
        },
    },
    dialogContent: {
        maxWidth: 440,
        padding: '35px 50px'
    },
    checkboxes: {
        marginTop: 15,
    },
    checkbox: {
        fontSize: 14,
        color: '#626262',
        lineHeight: 1.5,
    },
    checked: {
        color: '#085ca6',
    },
    submit: {
        background: '#eb621b',
        border: 'none',
        color: '#FFF',
        fontSize: 16,
        fontWeight: 600,
        height: 50,
        marginTop: 15,

        '&:hover': {
            background: '#ef8149',
            border: 'none',
        },
    },
    submitLoading: {
        color: '#FFF',
    },
    submitText: {
        color: '#FFF',
    },
    submitTextError: {
        color: 'red',
    },
});

const DonateIcon = ({ className }) => (
  <SvgIcon width="27px" height="24px" viewBox="0 0 27 24" className={className}>
          <path fillRule="evenodd" fill="rgb(255, 255, 255)"
                d="M23.565,21.422 C21.652,23.111 18.695,23.956 15.652,24.000 L-0.000,24.000 L-0.000,-0.000 L15.652,-0.000 C17.135,0.022 18.586,0.265 19.911,0.709 C20.541,0.917 21.143,1.170 21.695,1.471 C22.383,1.836 23.012,2.266 23.565,2.755 C24.652,3.778 25.478,5.022 26.043,6.533 C26.652,8.089 27.000,9.911 27.000,11.955 C27.000,16.222 25.869,19.422 23.565,21.422 ZM22.478,4.089 C21.704,3.397 20.775,2.863 19.718,2.484 C18.506,2.067 17.153,1.822 15.642,1.783 C15.623,1.783 15.604,1.782 15.585,1.782 C15.464,1.779 15.342,1.778 15.218,1.778 C15.218,1.778 15.217,1.778 15.217,1.778 C14.652,1.778 3.043,1.778 1.739,1.778 C1.739,3.111 1.739,20.889 1.739,22.222 C3.043,22.222 14.695,22.222 15.217,22.222 C22.043,22.222 25.391,18.978 25.435,11.955 C25.435,8.400 24.435,5.867 22.478,4.089 ZM14.565,20.978 L9.130,20.978 L9.130,20.889 L9.130,20.800 L9.130,12.533 L9.913,12.533 C10.261,12.533 10.522,12.400 10.695,12.355 C10.956,12.267 11.130,12.044 11.304,11.911 C11.521,11.689 11.695,11.422 11.782,11.111 C11.869,10.844 11.913,10.533 11.913,10.178 C11.913,9.778 11.869,9.422 11.782,9.155 C11.652,8.844 11.521,8.622 11.348,8.444 C11.174,8.222 10.956,8.133 10.695,8.044 C10.478,7.955 10.217,8.000 9.869,8.000 L9.130,8.000 L9.130,3.556 L14.565,3.556 C17.755,3.556 21.109,4.273 22.823,7.113 L22.826,7.111 C23.435,8.045 23.744,9.047 23.899,10.475 C23.923,10.682 23.943,10.893 23.956,11.111 C23.565,11.111 22.174,11.111 22.174,11.111 C22.174,10.667 22.174,8.000 22.174,8.000 L21.913,8.000 L20.869,8.000 L20.869,8.844 L20.869,12.444 L24.000,12.444 C24.000,12.474 23.999,12.503 23.998,12.533 L24.000,12.533 C23.956,19.644 19.130,20.978 14.565,20.978 ZM15.652,11.555 C14.994,11.555 13.790,11.555 13.478,11.555 C13.478,11.111 13.478,10.667 13.478,10.667 C13.913,10.667 15.652,10.667 15.652,10.667 L15.652,9.778 C13.391,9.778 13.782,9.778 13.478,9.778 L13.478,9.333 L13.478,8.889 C13.913,8.889 15.652,8.889 15.652,8.889 L15.652,8.000 L12.608,8.000 L12.608,12.444 L15.652,12.444 L15.652,11.555 ZM19.712,10.154 L18.869,8.000 L17.826,8.000 L16.130,12.444 L17.261,12.444 C17.261,12.444 17.565,11.555 17.608,11.555 C17.739,11.555 18.956,11.555 19.087,11.555 C19.130,11.555 19.435,12.444 19.435,12.444 L20.565,12.444 L19.652,10.222 L19.712,10.154 ZM18.348,9.111 C18.478,9.467 18.652,10.222 18.739,10.222 C18.087,10.222 18.608,10.222 17.956,10.222 C18.000,10.222 18.217,9.467 18.348,9.111 ZM10.174,8.933 C10.304,8.978 10.435,8.978 10.522,9.067 C10.608,9.155 10.695,9.289 10.739,9.422 C10.782,9.600 10.826,9.822 10.826,10.133 C10.826,10.444 10.782,10.711 10.739,10.889 C10.695,11.022 10.652,11.155 10.565,11.244 C10.478,11.289 10.391,11.378 10.261,11.422 C10.174,11.422 10.000,11.555 9.739,11.600 C9.739,11.600 9.522,11.600 9.087,11.600 L9.087,8.933 C9.522,8.933 9.522,8.933 9.522,8.933 C9.913,8.933 10.087,8.933 10.174,8.933 ZM6.558,11.944 C5.602,12.608 4.281,12.509 3.435,11.644 L3.474,11.604 C3.046,11.155 2.782,10.543 2.782,9.867 C2.782,8.492 3.872,7.378 5.217,7.378 C6.562,7.378 7.652,8.492 7.652,9.867 C7.652,10.734 7.217,11.498 6.558,11.944 ZM7.391,20.889 L3.043,20.889 L3.043,13.333 L7.391,13.333 L7.391,20.889 Z"/>
  </SvgIcon>
);


const mocks = {
    banks: ['ABN-AMRO', 'ABN-AMRO 2'],
    totalSum: '327,68',
    donations: [
        { amount: '14,50', inOut: 'Bij', name: 'Janette', notice: 'Success allemaal!', time: '15:44, 7 April' },
        { amount: '12,50', inOut: 'Af', name: 'Feda', notice: 'Longfonds: Flyers', time: '15:44, 8 April' },
        { amount: '14,50', inOut: 'Bij', name: 'Janette', notice: 'Success allemaal!', time: '15:44, 9 April' },
        { amount: '12,50', inOut: 'Af', name: 'Feda', notice: 'Longfonds: Flyers', time: '15:44, 10 April' },
    ],
};

const apiUrl = 'https://dev.api.forus.io/api/v1';

const filterDonations = (view) => ({ inOut }) => {
    if (view === 'beide') return true;

    const viewName = view === 'in' ? 'Bij' : 'Af';

    return viewName === inOut;
};

// step:  "Doneer"
class DonateCard extends Component {
    state = {
        dialogOpen: false,
        bank: '',
        banks: [],
        bankFetched: false,
        amount: 25,
        comment: '',
        isAnonymousDonation: true,
        isMoneyToAnotherActie: true,
        view: 'beide',
        submitLoading: null,
        redirectUrl: null,
    };

    componentDidMount() {
        const getIssuersUrl = `${apiUrl}/platform/funds/11/ideal/issuers?`;

        fetch(getIssuersUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
          .then(r => r.json())
          .then(({ data }) => {
              this.setState({ banks: data, banksFetched: true, bank: data[0] && data[0].bic });
          })
          .catch(error => { console.error(error); });
    }

    requestPayment = () => {
        const { amount, comment: description, bank: issuer } = this.state;

        this.setState({ submitLoading: true });

        const requestUrl = `${apiUrl}/platform/funds/11/ideal/requests?`;
        const body = JSON.stringify({
            amount,
            issuer,
            description,
        });

        fetch(requestUrl, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
          .then(r => r.json())
          .then(({ data }) => {
              let redirectUrl = data.issuer_authentication_url || data.share_url || null;

              if (redirectUrl === null) {
                  this.setState({ submitLoading: false });
                  return null;
              }

              this.setState({ redirectUrl, submitLoading: false });

              window.open(redirectUrl);
          })
          .catch(error => { console.error(error); });
    };

    toggleDialog = () => this.setState(({ dialogOpen }) => ({ dialogOpen: !dialogOpen }));

    changeText = ({ target: { name, value } }) => this.setState({ [name]: value });
    changeAmount = ({ target: { name, value } }) => this.setState({ [name]: value.replace(/(-|\+)/, '') });
    handleCheck = (name) => () => this.setState({ [name]: !this.state[name] });

    changeView = (view) => () => this.setState({ view });

    getSubmitContent = () => {
        const { submitLoading, redirectUrl } = this.state;
        const { classes } = this.props;

        switch(submitLoading) {
            case null: return <div className={classes.submitText}>Submit</div>;
            case true: return <CircularProgress size={24} className={classes.submitLoading}/>;
            case false: {
                if (redirectUrl) {
                    return <div className={classes.submitText}>Success</div>;
                }

                return <div className={classes.submitTextError}>Error</div>;
            }
            default: return <div className={classes.submitText}>Submit</div>;
        }
    };

    render() {
        const { classes } = this.props;
        const { bank, banks, comment, isAnonymousDonation, isMoneyToAnotherActie, amount, dialogOpen, view } = this.state;

        return (
          <div>
              <WorkspaceCard
                title={"Doneer"}
                image={require("assets/img/backgrounds/workspace-welcome-bg.jpg")}
                content={""}
                expandContent={
                    <div>
                        <div className={classes.content}>
                            <div className={classes.donation}>
                                <div className={classes.totalSum}>€{mocks.totalSum}</div>
                                <p className={classes.totalSubtitle}>Opgehaald bedrag</p>
                                <Button onClick={this.toggleDialog} className={classes.donateButton} variant="outlined">
                                    <DonateIcon className={classes.donateIcon} />
                                    <div className={classes.donateText}>Doneer</div>
                                </Button>
                            </div>

                            <div className={classes.description}>
                                <Typography component="p" className={classes.title}>Aangesloten producten*:</Typography>

                                <ul>
                                    <li className={classes.listItem}>Flyers</li>
                                    <li className={classes.listItem}>Posters</li>
                                    <li className={classes.listItem}>Borden</li>
                                </ul>

                                <Typography component="p" className={classes.text}>Vrijwilligers kunnen het geld uitgeven aan bovenstaande producten. Indien het geld niet wordt uitgegeven kan het gestort worden aan de Alliantie Nederland Rookvrij. Deze keuze maak je wanneer je doneert.</Typography>
                            </div>
                        </div>

                        <div className={classes.donationsTop}>
                            <div className={classes.donationsTitle}>Transacties</div>

                            <div className={classes.donationsButtons}>
                                <Button
                                  className={`${classes.donationButton} ${view === 'in' ? classes.donationActive : ''}`}
                                  onClick={this.changeView('in')}
                                >In</Button>
                                <Button
                                  className={`${classes.donationButton} ${view === 'uit' ? classes.donationActive : ''}`}
                                  onClick={this.changeView('uit')}
                                >Uit</Button>
                                <Button
                                  className={`${classes.donationButton} ${view === 'beide' ? classes.donationActive : ''}`}
                                  onClick={this.changeView('beide')}
                                >Beide</Button>
                            </div>
                        </div>

                        <Table>
                            <TableHead>
                                <TableRow className={classes.tableRow}>
                                    <TableCell className={classes.tableHeaders}>Bedrag</TableCell>
                                    <TableCell className={classes.tableHeaders}>In/Uit</TableCell>
                                    <TableCell className={classes.tableHeaders}>Naam</TableCell>
                                    <TableCell className={classes.tableHeaders}>Notitie</TableCell>
                                    <TableCell className={classes.tableHeaders}>Datum</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mocks.donations.filter(filterDonations(view)).map(({ sum, inOut, name, notice, time }, index) => (
                                  <TableRow className={`${classes.row} ${classes.tableRow}`} key={sum + time + name + index}>
                                      <TableCell>€{sum}</TableCell>
                                      <TableCell>{inOut}</TableCell>
                                      <TableCell>{name}</TableCell>
                                      <TableCell>{notice}</TableCell>
                                      <TableCell>{time}</TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Dialog
                          open={dialogOpen}
                          onClose={this.toggleDialog}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                            <DialogContent className={classes.dialogContent}>
                                <div className={classes.fieldName}>Kies uw bank</div>

                                <FormControl variant="outlined" fullWidth className={classes.formControl}>
                                    <Select
                                      value={bank}
                                      onChange={this.changeText}
                                      input={
                                          <OutlinedInput
                                            name="bank"
                                            id="outlined-age-simple"
                                            labelWidth={0}
                                          />
                                      }
                                    >
                                        {banks.map(({ id, name, bic }) => <MenuItem key={id} value={bic}>{name}</MenuItem>)}
                                    </Select>
                                </FormControl>

                                <div className={classes.fieldName}>Kies bedrag</div>
                                <TextField
                                  name="amount"
                                  type="number"
                                  value={amount}
                                  onChange={this.changeAmount}
                                  fullWidth
                                  inputProps={{
                                      min: '0',
                                  }}
                                  variant="outlined"
                                />

                                <div className={classes.fieldName}>Uw bericht (optioneel)</div>
                                <TextField
                                  name="comment"
                                  value={comment}
                                  onChange={this.changeText}
                                  fullWidth
                                  placeholder="Uw bericht (optioneel)"
                                  multiline
                                  variant="outlined"
                                  rows={3}
                                />

                                <div className={classes.checkboxes}>
                                    <FormControlLabel
                                      control={
                                          <Checkbox
                                            checked={isAnonymousDonation}
                                            onChange={this.handleCheck('isAnonymousDonation')}
                                            value="checkedA"
                                          />
                                      }
                                      classes={{
                                          label: `${classes.checkbox} ${isAnonymousDonation ? classes.checked : ''}`
                                      }}
                                      label="ik wil anoniem doneren"
                                    />

                                    <FormControlLabel
                                      labelPlacement="end"
                                      control={
                                          <Checkbox
                                            checked={isMoneyToAnotherActie}
                                            onChange={this.handleCheck('isMoneyToAnotherActie')}
                                            value="checkedA"
                                          />
                                      }
                                      classes={{
                                          label: `${classes.checkbox} ${isMoneyToAnotherActie ? classes.checked : ''}`
                                      }}
                                      label="Als het geld niet wordt gebruikt voor deze actie, mag het geld voor een andere actie worden gebruikt. (als u dit niet aanvinkt wordt het geld naar uw rekening teruggestort als het fonds afloopt)"
                                    />
                                </div>

                                <Button disabled={!!this.state.submitLoading || !!this.state.redirectUrl}
                                        variant="outlined" onClick={this.requestPayment}
                                        color="primary" className={classes.submit} fullWidth
                                >
                                    {this.getSubmitContent()}
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                }
              />
          </div>
        );
    }
}

export default withStyles(styles)(DonateCard);