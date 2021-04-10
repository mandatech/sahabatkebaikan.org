import { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import TelegramIcon from '@material-ui/icons/Telegram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import ShareIcon from '@material-ui/icons/Share';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useRouter } from 'next/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { share } from 'utils/shareLinkTo';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    maxWidth: 450,
    padding: 8,
    background: theme.palette.background.default,
  },
  button: {
    height: 50,
  },
  speedDial: {
    bottom: 0,
    position: 'fixed',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      top: 35,
      // right: theme.spacing(2),
      bottom: 5,
    },
    // '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    //   top: theme.spacing(2),
    //   left: theme.spacing(2),
    // },
  },
}));

const DonateNowButton = ({ campaign }) => {
  const classes = useStyles();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const [content] = useState({
    link: `${process.env.NEXT_PUBLIC_WEB_URL}/campaign/${campaign.slug}`,
    message: `Assalamualaikum. Yuk donasikan sebagian harta sahabat pada campaign ${campaign.title}! Silahkan klik link berikut:`,
  });

  const handleDonateBtn = () => {
    // if (localStorage.getItem('token')) {
    router.push(`/campaign/${campaign.slug}/donation-amount`);
    // } else {
    //   router.push(`/login?redirect=/campaign/${slug}`);
    // }
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={10}>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          fullWidth
          // onClick={() => router.push(`/campaign/${slug}/donation-amount`)}
          onClick={handleDonateBtn}
        >
          Donasi
        </Button>
      </Grid>
      <Grid item xs={2}>
        <SpeedDial
          ariaLabel="Bagikan Donasi"
          className={classes.speedDial}
          icon={<SpeedDialIcon icon={<ShareIcon />} openIcon={<CloseIcon />} />}
          openIcon={<CloseIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="up"
          FabProps={{
            color: 'secondary',
          }}
        >
          <CopyToClipboard
            text={content.link}
            onCopy={() => {
              setCopied(true);

              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
            <SpeedDialAction
              icon={<FileCopyIcon />}
              tooltipTitle={!copied ? 'Salin Link' : 'Tautan berhasil disalin'}
              // onClick={handleClose}
            />
          </CopyToClipboard>
          <SpeedDialAction
            icon={<FacebookIcon />}
            tooltipTitle="Bagikan ke Facebook"
            onClick={() => share(content).to('facebook')}
          />
          <SpeedDialAction
            icon={<WhatsAppIcon />}
            tooltipTitle="Bagikan ke WhatsApp"
            onClick={() => share(content).to('whatsapp')}
          />
          <SpeedDialAction
            icon={<TelegramIcon />}
            tooltipTitle="Bagikan ke Telegram"
            onClick={() => share(content).to('telegram')}
          />
          <SpeedDialAction
            icon={<TwitterIcon />}
            tooltipTitle="Bagikan ke Twitter"
            onClick={() => share(content).to('twitter')}
          />
        </SpeedDial>
        {/* </div> */}
      </Grid>
    </Grid>
  );
};

DonateNowButton.propTypes = {
  campaign: PropTypes.object,
};

export default DonateNowButton;
