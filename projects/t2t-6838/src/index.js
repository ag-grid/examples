'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const logos = {
  AgGrid:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtAAAAD6CAYAAACI/3DlAAAACXBIWXMAAAsSAAALEgHS3X78AAAcTUlEQVR42u3dCbAdRb0HYELYEnbQECU8g2wa8EGURRFBoLBUFqMxPBBRUHwSXICiVCxQUVFkUUBFEOSxqlFEtrAlD3NZXYAnRkERkKC4oSAogqz3dVudVIwhufd2z5yZOd9X9S8pq3Knp6fPzO/MmeleZhkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOiCmbPnjAt1saqtTjfqAADaHaAnhhpUtdU8ow4AQIBWAjQAgACtBGgAAARoARoAAAFagAYAQIAWoAEAEKAFaKMOAECAVgI0AIAArQRoAAAEaAEaAAABWoAGAECA7mCdf/XAzdMuvWmgQzXDpwgAEKBVJfX1WQNz/+vSmwandavm+RQBAAK0Ep4FaAAAAVp4FqABAARo4VmABgAQoLtR3+h+eBagAQABWpWpGbMG7ty7++FZgAYABGglPAvQAAACtPAsQAMACNDCswANACM2esJuXwn18AjrK33WV1uEGhhhXS9Aq8XVN2cN3NOH4VmABqDVofDsUIMjrLP7rK9em9FXgwK0Ep4FaKjyIrVqqPVCbZbu+Lwi1ORQ/xlqYqh1Q43VU608tmukY7h5OrZbpv/dNP3/40OtqKcEaAG6FQH6haFuUyOrc68e+Gkfh2cBGkZ4IRoT6pWh3hfqy6H+N9QvQz0+jAvSI6HuCHV1qK+GOijUq2MA18M9Pbarh9op1GGhzgx1Xah5oZ4cxrH9U6jbQl0e6uRQ+4d6uXAtQAvQdEEIj4dP6+/wLED3wQnzraEOGWGtpgf/pS/jncZPpOcBn8y5EA2hbg91UqhdQ62i9ys9rqND7RDqhFC3hnq2wuP6dKgfhPp0qO1DreAICNACNMKzAE2zTpbjQj2RccI8WB/utkGoT4X6VcWBeUkVw/qlofYMtZKRXezYbpl+PfhTD4/t30KdE2qXUMs6KgK0AI3wLEDT+5PlkZkX9/hIwqg+7bsYaC6r+G7kSCo+9nFaqI2N8BEd1+VCvS3dBR5sWP0u3Zke50gJ0AI0wrMATe+Cwv0FLuqv77N+e1OomxsYrhatGOwvDLWN0T7kz8OBPf4lYagVn6M/NdSGjpwALUAjPAvQ1Hui3LPQxfyKPumvV4W6sQXhanF1cahNjPrnPLZTQ93VwuMan5c+xR1pAVqARngWoKnvRHldwTudG3S4n9YO9T8tDc6LPid9jGek/+XYbhRqdgeO7V9CTe/Xx6kEaAEa4VmApq6T5OaFL+AndrSf9gj1hw4ErIXrF/3+WEcMmvEF2FCPdezYzolzTTvDCdACNMKzAE01J8kzK3hxbeUO9c8KaYq4wY7WU6E+0Kdjf6308mdXj+3D/fZeggAtQCM8C9DUFSCquPN2YEf6Jz6ycW2HA9b8Lzzb9OHYf0mouzt+bOP+TXCmE6AFaIRnAZqyJ8gPV7iwx6iW982Elr5MJjwv/dhuk+7OCs8CtAAtQCM8C9AM6+Q4Oi05XNUFfKcW982Ghab1E56bd2x36uDzzsKzAC1At8DM2XP2C3VUF+oLV173sRAKB9SQa4ZPQHdOjm+q+CJ+UYvvPN8tPHf2zvMjwrMALUAL0D0K0AOhBjtQN4Va3RGlXy8k11R8IX+mbbMAhPauEuq2moJOvMP97bT099vTxSouF/3SNKXaFqG2ii+BhXpXWiny/NS+J4XnYR/b9WtchvsXacntI9O80vHYTo4rQqZnr+OxfWWo3UK9N42BuNDNnelzIzwL0AK0AN3U+l6osY4m/XoR2bSmIHFsi/okTmd2acX9cVOo9+euGhf+/di0fPhxoe4VnpfaX6uGuqPimUwuD7VvqPGZbY0v9r4lLcH+Z+FZgBagBWjhGZpzYvxKTQH6wVBjWtInh1cYrk6raqnlFPx3SHcwnxWeF9tHMyp8FOaoqlb/S1MovjnUDcJzsT6NXz7XGGGN7bO+EqAFaOEZFjoprh7q0RqfyXx3C/pky7QUcul9/05Vwfk59mNSqKuE53/pk/0qejzpxFDPqznMzBWeEaAFaOEZenNSPKTml5p+3PD+WLGCn/fjioVv6eE+7Z2WdB5MM05s26djfb0Kpqv7Waite7Q/y4X6aPpVY/5z9Os5qyFAC9DCM1R7Qly2R3Mbv6bBfXJE4X2NC6+s04D9ii+s3dLm6QQL9MEFhY9tfH52pQbs147xi2mdv24gQAvQfRmghWdIJ8Q39mhqrW83tD/WLTwn8BmhljfSGnFsdyw8hg/VqwjQAnQfBWjhGRY6IV7ZowAdf3Jet4H9cUbBfTy17asvdmicxxcrf1jw2E7XqwjQAnQfBWjhGRY6GW60lFkallbXZYaQTzesPyYWfHFQeG7Wsd2tYHg+UI8iQAvQfRSghWdY5GR4csbJMC7c8YJQ92X8jQfitFwN6o8vFQpYNzRpv/jnsb2+0LE9XW8iQAvQfRSghWdY5ES4SuYSxt9Kfyf3hbt9G9Ifq4X6e4GA9afchTMofmxfUSg83+qLEQ09l78xrXJ5bqjvpxfDf5dmnImz78wLdXuogfglMNRhaeGlVQRoAfq56prLv/XzJ7+w6pcHj1/mpIbXukYSdZ50D8oME69Nf2d85jLSP+pIf8yvaUZX48b66QWO6xOhNtObS+3rkfbvN0ewrbia5Pbps3tCmmP9+2nZ9AdSeIznpjWW8ndatxJh2O7aoT6Yfll5MvOXxKvSipljhrBdAbpPAvScmeff8/TnVxwM4bQNtYWRRF0n3/hC1c8zToR3LPx8b5xRIzOcbNOAPvlBiUVSjK7GjfUVM39pmV9H6s1KA/TFQ/jbY0JNCfXVdDf1mSH+7c4E6LC9yWkVzScqeLE7LhP/kSUFaQG6PwJ0y8KzAE2tJ+GdM0+0B5c8qYY6r8f98R8FLj7xTs6Lja7GjfXdCxzb37Rl+fkuBuj4BTs9mjDS1VJbH6DTHO4X1DRDUnyvZTcBuj8DdAvDswBNrRe5SzJOgo8tekEqcEf7yV4uNFJoJcZTjKxGjvWzCxzb9+jJygP09xbzt7ZKz+zmHr/WBuj0C8pRFd1xHsoc9mME6P4J0NdedtYdLQzPAjS1XeDWz5y67syKQujHe9gnV2e2/WnLJzdyrI9KS6jnHNvfxuWy9WblAXpgob8RH9X4cuZ5qvUBOvztTdKjKoM9rJsXfilagO5ugI7h+ZkTlmtjeBagqe0Cd1zmCXXL5/i7a2Su4PfbXqzYF2dVCPV4Zp9cYmQ1cqy/rECA+KSerCVA35D+/YS0JHnJENi6AB3+7tRQf+txeJ5fd8fjIkB3N0APXHbOT1scngVoarm4jQ31UM40Xkv5+2dlnqj36kGfbFvgArOX0dXI8T69wLF9iZ6sJUDfFlcmTWFtsJ8DdKFHykrXz0KtKUB3L0DPmXnu3JaHZwGaWi5uB2SeRN+9lL+/debfv74HfXJYgenNVjG6Gjnez8s8trfrxdoC9B2Fl1pvZYAOf+/DDQzP8+vyUDsK0N0J0B0JzwI0tVzcfpJx8otzqq48hG3cmnmSnlxzn5yfe1Exsho73n+WeWw/oxdrC9BVVisCdJqLebDhdYkA3Y0A3aHwLEBT+YVth8wT5xdrust9Vs39MjezvdONrkaO9xXSy505x/ZVelKAriNApxlHnmhBgB4UoNsfoDsWngVoKr+w5c4hOmmI21k5c+GK+ELf2jX1yagCLxBubnQ1cry/pMCjOZbtFqArD9BpKe57ux6eBehmBOgOhmcBmkovahMy78YNDHN7X8o80R5eU7+sm9nOx01x1tgxv2vu9F16UYCuKUCfUvH+P50WA7o9PdZ0X+by3wJ0SwN0R8OzAE2lF7XP1DnLRLxbXWAlrNE19Ms2me38kdHV2DH/3sxje7peFKCrDtCFZgFatJ5KzyofkH6JWX4x2x0dasNQ7wz1jcwpSAXoFgghc3oHg7MATaUXtLiS1QMZJ70HRvJTdvg312aebN9cQ9+8JbON3+rB8YxzG09pYI1t2Lj/VOax/WgP2rxdA4/rrgJ0pQH6xoL7GUPw50I9fwTtWC3+8pc5zakALTwL0HQqQL8z86T32RFud+/M7c6poW/2y2zj8T04nic1NKRs1bBxn9tP+/SgzQMNPK5PL7qcc0MC9D2hLk4LQx0cfyUL9YY0T/HkUFssVKObGKDTF5RS/RFvWGxQYAyOC/VtAVp4FqARoCfsdkvGCS8upTtxhNtdIfPOd6xNK+6b92W27zABupmPPIT2nJG5PzsL0AvqoAYE6HguujJN9bZO4X7vVYC+tVDffKn0uxhpMZdnBGjhWYCmX8PzK3s5x3H498dkbv+0ivvn0Mz2vUuAXlDzGjb2z8ncn5cL0Avq4h4H6LiAx8YV9nvtATr8u+0L9c2xFfbLPqVDtKuy8CxA05YA/Y3ME97umdtfP905Gun2/x6Xj62wf47K7J93CtCNDdAXt216QgH63yrOFPHeGvq9FwH6ogL9E8/voyrum8MEaOFZgKbfwvP4zKmK4kwYyxZoxxWZJ91DGxygpwjQnQ3QEwXongbox+p6jKbuAJ1e2MtdNCVOR7dSTf1ziQAtPAvQ9FOA/kTmye6IQu3YvcDLQstW1Ee5AXqaAL2gftWxAL2RAL2gvtuDAP2mGvu97gA9rcDz4FvWfDPmLwK08CxA0w/hOb7A9/vMn07HF2rL6HQ3O+fEu1tDA/R+AvSCuq1jAXqLHrS5qQH67GHsQ6Of621IgD43s3/O78HY/IgALTwL0PRDgN4r80T37cLtOTKzPVdV1E+HZLbrQAF6QX2/YZ+BszP355UC9II6tcYAfe9wps1raYCel9lHk3owNseWuAvt6iw8C9A0PUDflHmie23h9oxPq2PltGmTCvopdx7oXiy20dQAPdCwz0BuP71BgF5QJ9UYoP+7ZV+2zh7mttbJne+5h5+pkwXoRobn/fs8PAvQFDvJvSLzJPeLKt7sDn/zgsx2fbGCNu1a1525PgjQFzTsc3BE5v68twdtbmqAPmIY+5CznUfrvvvcgwCd+07IB3v4mdq2ywF65uw5y4Wa2KZ67ORx00J4fDDUw31eL5P+KHGSOyvzJHdIRe3aKbNdfw21auE2Tc5s00wBurovOJn9tH/m/hwtQA9/vvPM7VzUo7FSZ4A+vG0vty7U9mVzl/pueICOoXSwRfW9UGOlHihzgnt+qH9kTh21ZkVtGxXqzsyLxwcKt2ntzPbcKUAvqA817LOwc+b+fEuAXlC71BSgD++DAH1axrYeasDn6ioBWniGLgboj2ZewM6quH25L+39vPTjJbl3VEKtXvMx/nh6Calk3V8gZL25YZ+F/2jbtHxhmzMqOLYPFDi269cUoN/aBwH6qjY+/7xQ+48XoIVn6Fp4Xi7UrzMvYFtX3Ma10l3unDa+rnCbbsxsz84dGDuvKBCyNm3YPo1Kz9Tm7NPaHTi278rsg/iL1uiaAvSOfRCg57Zp+rrFtP99ArTwDF0L0FMzL163tuBiFeuywu05JbM9n+7A2HlrZh88Hr/ANXC/cr8cTe3AsT06sw9uHub2GjP7T0MDdM4Udie1/TojQGfVgPAM1ZzYcp+fPKCmdm5dYBWu9Qu25x2Z7ZnbgbGTO2PFjxq6X1/I3K9zO3Bsc2e/OV2ALhqgcx6pOaoB42l3Abon9cNQqy8DFD+pvazAHcRNQ02sqX6Z2d7PF+y7iQUeX9ig5ePn0rrmCa55v6Zk7ld8Pn75lh/b3Me69hOgiwboh1seoF8vQAvP0KUAfXpD396vquKKWCsX7L/clcGOavHYWbbAi2ZTG7pva6VfLDrzcuQw939C3V8OBehKA/Txbf9SKkALz9Cki+Saof7eZwG66IplBZ6D/l0TnwEe4r6/KnPfn6lq6sNC+5f7HPSsFp8bptc9E4kAvdRt/T5jW2c0YEy9W4AWnqErAfqwPgzPsX5asA93KdCeaS0dP8dm7vd1Dd+/DxU4thu39NheXffiOAL0UreV82vXVQ0YU58QoIVn6EJ4jj+/39unAbrYBTdO05V5Z+ifgT4ej5aNnxVC/TFzvw9t+D5OKPAYx9dbeG5Yv8B+7ziC7QrQS97WTzK29esGjKsZAnTl9dNQay4DVHoy272Pw3OsCwv25fEF2rNXy8bPPgVmRHlhC/ZzdoH9nNSyY3t8gceSlh3BdgXoJW/rssw+GtfjcXWXAF1dXXHl7F/8frvX7Bg6aouG1/rLQMsD9Kw+D9BPxxXnCvXlRgXu2MWfZ1dpydhZrsBsKLNasq9TC4y12aVXwaxwf19Q4L2I40a4bQF6yds6NbOP3t7DcZW7uqcAvYS6cuZVdz+xxhp/DZ002IK6WAKjzeH5pX0enufXMQX79PIC7Tm5JePnoAL7OrUl+xq/LNxXYH/3b8n+lpiVZ0MBupIAnftM/nd7OK4+IEALzwI0XQjQXxKe/1l/CrVSoT7doUB74l3snRo+duKdpL9m7ud9bZp5JLT14ALHNk5BNrHh+7ljgf28PGP7AvSSt7VzZh891avHpsJ2bxOgKwnPd/1jzTUfbFF4FqBpdXheLdTfhOfydwbD37qhQHv+0NSglV6YvKbAPh7Sss/MmPRlK3e/by05B3nhfVyz0EvFr81ogwC95G2tWuBRsc/3oI9KfDEToBd95vnyq+e1MDwL0LQ6QH9QaP7XUFOwb3co1KY74kIeDRw7JxTYtzhjyZgWfm4OLnRs46M+oxv4xejqAvs2kNkOAXrp25ub2U9PjPQRmxH2T5zt6YcCdOHwfMWsXz82blwbw7MATWvD86hQdwrN/1bbFuzjmYXaFC86qzdo7EwvtF8fbOlnJ07b96tCffD1poTodE44rdB+bS9AVx6gjylwnK6va/zFX5tKnacF6E6EZwGa1gbo1wvLi60ZBft4o3SXZ7DQT/7jGzBuDiq0P/HL2/It/vzsUXDMfafXd+LT3cFTC+3Pdwu0R4Be+vYmFzpeJ9TQN1uFelyAFp4FaLoQoGcKy4utJ+P0XQX7+aiCbftNXDK7R+NldKHHNubXLh34DF1csD9ujouW9Gg/4vO0lxbaj0dLPLcvQA95m//X9F+D4mMiBRaYEqC7F54FaFp54d+gwAsoB4Rao4G1TYET9CcL9vXyJd46X6ieCXVinfNEpzvp1xfch7M78jkaH+rBgv0Sw+ehdT7SEbb1mtxFLap4KVSAHvI292/asVukfZuFur/0jY5+DtAdCs8CNK288J+YeQL7c6gVG7x/NxWY/WKFgu2ZVGBBisXdjT6wyp/+0ywtnwr1WMF2z2vS89wF+mhKBb+CxC9cb6lySfe0NPnXCnyRXriuKdVmAXrI21yp0Kww8yvO/T22UH/sW8F5r68D9OVXzv7joxMmPNSR8CxA07oL/sqh/tK26Y+GuY/7FThJv61wm95e0SMnv0+PiaxfsK0TQ302fVEq/XjMth38TJ1Q0bG9I82U87yCbZ2cQtLjhdv6x1DrFmynAD307R5Z+Fjelb4YjhpheyYVWkxKgF40PK+3XpfCswBN6y72BxY4gW3S8H0cG+qhzH38QQXt+lzFz2/fkC6m2w3nF4L0perVoY5Id++frah90zv6mRpdcWB4Mv39OIvBFsN5xCNOgRifNw91bKjbK2zfDoX7VIAe+nbHVPGYRKgfh3p//LViiONsrzROn634PNd3Abqj4VmApnUX+9yL6JyW7OdJBU7UWxZuU5wm7JyaXoZ8OtQ96YJ2VuqPT6epr+J/nxlqdqhfpueqq27PFzr+uYpf2n5Q07GNM7v8LNRF6TGMk9KvEMel/z4v1LXpcZk62vPOCvpTgB7etvet+BjfHeqStHJt/HXqM6G+GOrCNBafrWmstSFArxJqv5L16IQJd3UwPAvQtOoiX2IVqD1bsq+TCuzrORXdrfx6n81scv5Ifw5u2edr9VILRbSoPlRRXwrQw99+38ys1G/X7rDD8wRo6O0F/qLME9cDJV+uq2F/ry9wp29cRSH6zD652J3TtNX2agjR1wrPAnQPAvT4wi8UCtACtAAN4aTzogI/1R/Xsn3ep8DJ+ogK23dExy90x/TDnefFHNcV0l33Ls+V/o6K+1CAHlkbXpce32r6GLpbgBagBWjaclHPfYEtPuO2Qcv2ecUCM0nEl3OWq7CNexSYFaVpFae927fPP2+j0pzOT3Xs2MZZX7arof8E6JG346CGj6G/hXqZAC1AC9C04WI+psCCD7Nauu+fL3DCn1ZxGyd26Gf/ufHi6FO34Nhuk17U7MKxvbKu5eQF6Oy2HNPQMRR/Bd0jtfFpAVqAdpWg6RfxEqtVTW3pvm9SYN+vraGdy4b6QKhHWvyz/tFNXmCnh2MwztBxfIvvRsdfSN5T5+M4AnSR9nyqgWPpPQu172EBWoB2haDpF/AfF1iZb/kW7/81BU78m9fU1nVCndGS5xjn1xWhXuqTttRjO6llMyU8k8biOj3oKwG6TJveHeofDRlL71mkbfcL0AK0KwNNvmi/psDJ7+iW98GeBfrgaz24c35WurPb1IA10Kuw0vLx+Or0paOpxzW+7zAjBv4e9pEAXa5dW6S5mns1nv4aarfFtOsuAVqAdkWgyRfrGQUupi9qeR+skKbgy30xbq0etH1CWiTjNw0KV5eG2t6nK/vYbpYWpni4Icf2H2lhlkkN6BsBumzblg91eKi/1zym4uJCGz9Hm24ToAVoVwKaeoFet8Bzl1d0pC+OLXAx+HAP2x/njn59qG+GerQH4eqe9EzlRJ+s4sc2vuT7tlBX9eg56VtDHRxq7Qb1iQBd3Rfy02r4ZevxOE/4kuaAz5mnX4AWoKHqk2WJl0imdKQvXlxgudl748t+DdiXOD3frmnZ5tsqWoo7XgDnhDoy1GSfptqObVyIZe90J/iuisLNw+lXhBiaX9zQfhCgqw/S8abC7wqPrYfSzEcvGEIbZgnQArSzPk29GE9PP/+PtD5W5RzIPeiPgzL746ihXBh6sF8rp+dqDwx1YqhLQt0S6rdL+cn20fRoSFx++sJ0QY0ztkzu0nFv+ZhdK9QuKeyekqaSm5te7F3Sy2GPpF8Nbky/WnwyBfNN2rC4TeZndGKP2jwlo81TetTmOPvPzin03jLCL+P3pxVHp4ZaaRjb3muk/dWHAfp1oaZ0sLZxlgeaHEbiRXKNRWqUnunEsV1+keO6ml4hYzytFmqrtIrrEelXrjgTy3nppeaT0i+bccrNN8bHBPUaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQBf9P7dnGRyTvUiDAAAAAElFTkSuQmCC',
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(
    () => ({ width: '100%', height: '1000px' }),
    []
  );
  const gridStyle = useMemo(() => ({ height: '1000px', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete' },
    { field: 'country' },
    { field: 'age' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      width: 150,
      resizable: true,
    };
  }, []);
  const defaultExcelExportParams = useMemo(() => {
    return {
      prependContent: [
        {
          cells: [
            {
              data: {
                type: 'String',
                value: logos.AgGrid, // see imageUtils
              },
              mergeAcross: 1,
            },
          ],
        },
      ],
      rowHeight: (params) => (params.rowIndex === 1 ? 82 : 20),
      addImageToCell: (rowIndex, col, value) => {
        if (rowIndex !== 1 || col.getColId() !== 'athlete') {
          return;
        }
        return {
          image: {
            id: 'logo',
            base64: value,
            imageType: 'png',
            width: 295,
            height: 100,
            position: {
              colSpan: 2,
            },
          },
        };
      },
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
      .then((response) => response.json())
      .then((data) => setRowData(data));
  }, []);

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel({ author: 'Custom Author' });
  }, []);

  return (
    <div style={containerStyle}>
      <div className='container'>
        <div>
          <button className='export' onClick={onBtExport}>
            Export to Excel
          </button>
        </div>
        <div className='grid-wrapper'>
          <div style={gridStyle} className='ag-theme-alpine'>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              defaultExcelExportParams={defaultExcelExportParams}
              onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
