const openInNewTab = (url) => {
  const win = window.open(url, '_blank');
  win.focus();
};

export const share = ({ link, message }) => ({
  to: (socmed) => {
    if (socmed === 'facebook') {
      return openInNewTab(
        `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          link
        )}&quote=${message}`
      );
    }

    if (socmed === 'whatsapp') {
      return openInNewTab(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(
          message
        )}%20${encodeURIComponent(link)}`
      );
    }

    if (socmed === 'telegram') {
      return openInNewTab(
        `https://telegram.me/share/url?text=${encodeURIComponent(
          message
        )}&url=${encodeURIComponent(link)}`
      );
    }

    if (socmed === 'twitter') {
      return openInNewTab(
        `https://twitter.com/intent/tweet/?text=${encodeURIComponent(
          message
        )}&url=${encodeURIComponent(link)}`
      );
    }

    return false;
  },
});

export default share;

// export default {
//   twitter: (link = '', message = '') =>
//     `https://twitter.com/intent/tweet/?text=${encodeURIComponent(
//       message
//     )}&url=${encodeURIComponent(link)}`,
//   facebook: (link = '', message = '') =>
//     `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//       link
//     )}&quote=${message}`,
//   google: (link = '') =>
//     `https://plus.google.com/share?url=${encodeURIComponent(link)}`,
//   tumblr: (link = '') =>
//     `http://tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(
//       link
//     )}`,
//   reddit: (link = '', message = '') =>
//     `https://reddit.com/submit/?url=${encodeURIComponent(
//       link
//     )}&title=${encodeURIComponent(message)}`,
//   whatsapp: (link = '', message = '') =>
//     `https://api.whatsapp.com/send?text=${encodeURIComponent(
//       message
//     )}%20${encodeURIComponent(link)}`,
//   telegram: (link = '', message = '') =>
//     `https://telegram.me/share/url?text=${encodeURIComponent(
//       message
//     )}&url=${encodeURIComponent(link)}`,
//   vk: (link = '', message = '') =>
//     `http://vk.com/share.php?title=${encodeURIComponent(
//       message
//     )}&url=${encodeURIComponent(link)}`,
//   hacker: (link = '', message = '') =>
//     `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(
//       link
//     )}&t=${encodeURIComponent(message)}`,
//   xing: (link = '', message = '') =>
//     `https://www.xing.com/app/user?op=share;url=${encodeURIComponent(
//       link
//     )};title=${encodeURIComponent(message)}.`,
//   mail: (link = '', subject, body) =>
//     `mailto:?subject=${encodeURIComponent(
//       subject || ''
//     )}&body=${encodeURIComponent((body && `${body}\n\n${link}`) || link)}`,
//   pinterest: (link = '', message = '') =>
//     `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
//       link
//     )}&media=${encodeURIComponent(link)}&description=${encodeURIComponent(
//       message
//     )}`,
//   linkedin: (link = '', message = '') =>
//     `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//       link
//     )}`,
// };
