"use client";
import React, { useState } from 'react';
import { Box, Card, CardContent, Container, Divider, Grid, Link, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { Edit } from '@mui/icons-material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';



const MyProfile = () => {
    const [openEditPopup, setOpenEditPopup] = useState(false);

    const handleEditClick = () => {
        setOpenEditPopup(true);
    };

    const handleCloseEditPopup = () => {
        setOpenEditPopup(false);
    };

    const handleSaveChanges = () => {
        // Handle saving changes here
        // This is where you would typically update your backend or local state
        // For simplicity, let's just close the popup
        setOpenEditPopup(false);
    };

    return (
        <section style={{ backgroundColor: '#f0f0f0', paddingTop: '48px', paddingBottom: '48x', minHeight: '100vh' }}>
            <Container>
                <Typography className="text-center" variant="h3" style={{ paddingBottom: '30px' }}>Hồ sơ của tôi</Typography>
                <Grid>
                    <Grid item lg={6}>
                        <Card style={{ padding: '24px', borderRadius: '0.5rem', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
                            <Box style={{ display: 'flex', alignItems: 'center', padding: '24px', background: '#4169E1', borderRadius: '0.5rem', color: 'white' }}>
                                <img
                                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMWFhUXGB0YGRcVGB0XGhkdGBgXGhgYFRgYHSggGBolHRcVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAPsAyQMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAADBAECBQYABwj/xABEEAABAwICBgcFBwIFAgcAAAABAAIRAyEEMQUSQVFhcSKBkaGxwfAGEzLR4RQjQlJicvEVsgczU5KiFiQXNENzgpPC/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAIxEAAgICAwEBAAIDAAAAAAAAAAECESExAxJBURNhcQQUMv/aAAwDAQACEQMRAD8AaxW1LUCmcTt9bElQN1ijdmnRcsnCmKrx+p3iVp0DZZRMV3857RPmkBoVajg8ECTqmBviUbDaRcTBaRzVKB++oztdHaR810OIwIm3z+qzckgoSY+VLkQYe8Kj6LgpsZmA6tYNdraoAdlIdqF0CdhBLTcxbis/RrgNNSAWh+EyJ3PO6QB0cgtnEU5EEdYzHELAw3R0vQkk61B4kxNi4xYBJJ9r8obaqj6FKmVQKwQMiVMrzqgCE7EBIZaorU0rUxC9RxF06Cx2VRzlBKytLaVFPoi7vD6oBmi96Tq49g/GOq/guWxOkHOMuJdz8hkEu6uSq6knS1dMtGQJ5wB8+5KVNOO2NaOZLvksL3hUSn1QWaNbSjz+M9XR8Eo7ETfbxul16VVILCmuVHvyhgqYTEa9cpBmaexGQ5JAnpFUiWaGHKzsVaueMH/iB5J7DlI6QtWbxaPFyTGNvJ1qZGetbu+S26TsQXFt7RdwgX3HasKq6NQ7njwPyX0tzJWUwRkNDWCXnhlmVao+lMFwF4uD8kXTrPuutMVmB1NwgXb5SOpZ4otbOP8Aa/SRwxaxoaXE/iyj6rmWaQFTSmCcGlvQqNIO/Vm28XWn/iUHjE03idV1OJ2XY7XF9sO71y+B6OOwXB9RtjOYbFxzRxyfav4O3k4If6i5Vuz64HKZQWlXlUcIHE3MblVjVemekVV1imAOqFDBZVquU0imINXxOpTc8/hE/LvXDV65e4uJkm66bTz4oO4kD/kFyYVRQy69K8FKoR5RClQgCYXlUKwQB5QpXoQBq1TYJB56SdqmySq5qkSxugUppX46Z4HuI+aPQKX0wf8ALPEjtA+SHsA1U9Acx8luf+J+AadWo+owgkGabiJBg3bKwap+7PUf+QXy32kEVqn73/3FJQUnkUpNH6Y0i5rqU5g3GyRErFdpeuDlTgCA1zZsOMym9GE1MLRfI/yW97Qs3H4+gNVrqgDmySWtL7EwAY2HVd2LnL9FPaKqMUxra1LIhwNJ5pkEAiLh1rrj9I6Pbh8Tgiw1Dr1haoWugHVyIA3LraVQvcw61M0zOuYcCMoLQQBGfcuL9oKNSnVoOe4OYMaNRweHdFxsImWi2XFXx09BKUq63g+oNKkuQ5UEpDLUs0t/UKTnvpNqsNWnBcyekAQDMbrjtXQaP0GT0qpLf0jPrOz1ktHD6HwzKhqtoUxUIg1NUF5G4vPSi29ax4W8syfKlo4xrpRaZXb1sSRYJOo4O+JrTzaPkolSxZcbeTgfaV33B/c3xXNNK+lac9n6demWsPu3GCPxNkbxn2HqXz3H6OqUH6lVsHMEXDhvadqcWhgQpCqCplUBKheJQ2VJQARSqr0IAvKlVU9aANB5t1pWumSbFLV1SJYagUDS/wADeDx/a5EoFU0lemeDmnvjzQwRL3fdnl5hfMvapv31T97u+6+kT0D+0+C4D2lwz3VnhrHOOtIDQTMgZQqhsiZ9u9lMRraOwxO2kwf8RKy8RRpB2sMO0u/M74s5EEcbq3sTrDR+Ha8Fpa3VLXAgiCRcFadentWKWxtmFTYGiBTcLzZ/zZksH27eDSwzoILa7TJIM3OdhvXX1WGLLlP8SmxhWO3Pae8Jxik1QnJvZ3Icuj0FgAAKjx0jdo3DYeZXNYFuuWN/MWjtiV3FSq1jZdlsC04or/pk80niK9L3KDWkRn1DzNlmY3TzW/HUbTByBcGk9qEzSYdBa3WByIOsD1zdOfJ8HDjrY26qZgg9vyUpb7RvbHUiseDkuV7OlaLSldLYBlemab+bT+V14cPV02oSQHySq0tcWuEOaS0jcQYKjWWv7ZYfUxTjseA/tlp72k9axJW5Bao0nJAw1B8mbD1Eb0bWVn1EAVc5ekocr2skMJrHeva3FUlelAGq7al6uSK8+CDVNlZDCUSqaT/yn8gexwKmk7eq469Op+x39pQwB0nSw/tPgV0mhqEsY7VzaLxwXK4F0sHEeS7b2dP/AG1M7226vRUu/CZVgcay0ZKrqPFXdUVC9QFAnYYb1x/+J9MfYnC5ILT1azV2VWrqiSYXLe1+q/A4sxru1bFskMaHNNzEA2Vwy8iapF/YVuknYqg6s6l9nDS92rGtqhjtTZ+bUHWuu9pNLOaBqxrn4Qchtk8Ba3JK+w3/AJMVN9NjR1NBd4t7FnaXq61d36RHXJ8g1Ocmol8cVKZg1tAsqEvrE1XOu5z7z9NwyCYw2jW070S6mf0Et7YzWg1eIXLcjuqITBaer0T94fet3gBrxyiAevtXT4TFNqtbUpmQerqI2FchUhV0Xjzh6oM/duMOG7c7q28OQVxd7M5wW0d/RqSiFZ9F8GE+0yPWxNqjFOzl/bvBa1JtYZ0zB4hxA7jHaVwpcvq+lcSynRqPqDWYGmW/mno6vWTHWvkWsrjoTCl6gvQiVUOQAXWXg9ClRKAC66nXQVZAGu4+CFUNlINhyVH5LT0kpUyUUH5tORBHaIUVckKk66YgWg3/AHTOQXcaCxJGDpA1NVoB3WMkTJXB6KMNjc4jsK+vewYH2GllPTz/APccnGLbMuSSSVnKaf02aTQ5jPemQ2xMmxvABJyiy1afsezFUqdTEV60uaHalN3u2N1gDERJPEnsXb2/ShVGj8vYYWkeJJ2zGfLapHMaP9jsFQBAa+peYq1HOFv0yG9yD7aVGf03FU2tDB7ipDWgAWaTYDkuiqYUfqHIjzCyPaPRuvhMQJf/AJNSxAI+B3BDS8CLfpjewFWdGUeQ72NHksjSDxL6haSXOPRnb8OZyFlrf4fUo0PQMXcCewlg/tchfZiWa29c3Lg7+CnZy+iNPsfWdRdTfTe0uAky12qSDBtuJyyXRFLjBsaS7VaCdoAB6yj6tpWEpxbwdMYyrLOd07pqnQLQ6m+oXT8OQiDBJ29IdqbwNZlVoIaWEgHVdE3EjIwbFPV9Hsf8TGuGfSAPXdHGHAFgAnKca/kFGV23gc9nsSRrMcZiNWdjd3dnuhdXh3evNcZo0ffiPynxauuon16zKpO0YTVMHp/D+8w1Zm0sJHNvSb3tC+SSvs7zlzXzHH+zVdtWo2lSc5gcdU72k9G5N7RdVFksxCVUFajvZ3FzHuHT1R2zCYHsjixHQb/vb807QqMWF4BdK/2KxAaCHUydok264ukWezmKJIFLLbIAPIk3SsZn4LCvqvDKbS5x9EncF0H/AEXW/wBSn3rf9m9Ctw4JJmoQATsG2G93Ytb3h3FFgfM6Tpa08AvVHQJQcE6abeSORIha+kASQUpSf04TYou3JCofvwOBnsTETgD8X73f3FfS/Ymr/wBq0a4EOfmY/G5fMcK74v3u/uK08Nia7GxTqENkmIac7m5Eq+OfR2Y83G5xo+s1jUiz2nrBWfU98Mmj/wCJjwIXzKrj8Rtqu7G+QSj8ZX/1X9RjwVy5kzOHD12fTnYrEN2P8R3gpbS2nqxomnEdF0m4ORvI4FfOG4yv/rVf/sd80/os1atWmx1WoQ57Wka7rhzgCM+KxbZ0JR+H1DRuB9xgaFHbSo02u/cGjXPIuJ7VlYqp0Q0bl02IcDM5HP6LmsdSLCQcth8lHNZp/j1eTLrg5+KVbVqWs3jnflu70zjaLnfC4s4iCe8GyzzhKk2rdrRfuhc6id6Zo4WYRyyUvg2OAhxBO8CJ6k242WbjkV4B6KoTiMsmeJGzI5bdy6dpjn2nrOzkFh6ILWlzybugAX2TGXMrbojWy6IB6zy2BbxVRycvI7lgI6r0gOE96tsB4IFY9IxxHcrudYH1cSpkJBQFVgm+5QHWUVquqLeuSVFFi+8FeOGByJHJLUw49LZsRnViE0IE5oaCkffncewfNFxNUvOqNtp9erJj7MfzDsVIlnyjRjvu2p5iz9A0X1GtYxpe4kw1ok57hsXeaJ9h6rhrV3CmPyiHO6z8I710NWzO0kchjsTqjjsS2hfZ7FVqodTovc0idcjVbf8AU6AepfXsB7NYSiQ4U2vePx1OkQd4mzeoBaNTFxl2D1zRhbJtvR8+0T/hnUgmvXa2STFMa2ZJILnRvGxdDhPY7C0x0nPeP1EeQWu/HTIygKlHFiCcz296hzQ+rEj7I4N3/pG/63fND/6LwV/uj1vd81qDHTafXXYIBxZsCY6+5JzQ+jJwfs9hKQ6FCnzc3XPa6Sm2tbrDotkGxgSOW5DY85z64IVB0vGdpPZlnxhHbKDrhlazhJ9diXqtDxBzFr7tnki4kweGQ4xbySdcHPbtju61bfgo/TGx2i3NMsJ5bOw2WXWqVW/hHWCF17Kh1CXNBDc4tA2G/X2FB+2UZHQvskT1rJwZsuU5nC6KxlYyHiizMnUlx4AO8fFaNfRAADS57zIu50kkXEAWb1LafjmnJ3+1ewjA6HxABMbznmdyVUHdsWw+FiNYyR3errTw7bcyk3ulwaOBPUn6WQSEKAkud+/u2eSJgnhzOkMt/AIcX5iOtp+RCnC2cRvM9RukMMxrtWRcbkN+FLs7ePH0FLauo2N3aq4Zz6nw2G0nw/hTvBWsldTMTl+n0N6FUw1U3AkZ2gdV9i16GGa3ISd58tyYctOuMmffODFweBcCS4crg854pv3J4dqbNInhwUfZz+YIyDaL4DAUcO3VoUmUwbnUETxO0my9WxcQOPqCUB+sIJLdpzm3Yo95cSLwRc794HPuWzk2ZKKRFWv0ZJHbPkkg2o74RI2et2S9iKkxJOfNNPxoa2G7Lb/DZfuWTzs1WFgCME82cY7PNWqYVuTjf+IS1TSZvkL8/wCEscfxHVfxU3FFVIKx0Eg7OvPgAiUjvy27NqSfVnK/IZz63qfeE/CIy2XuosqjUfiuZ5+EAp3A/DIzdlsyynrjuWVSwNQ31T12Pf6utX4XBu4avdbtPgujhTu2YcrVUhPFmXWyyHzQHAESUTEZx2Dhv5lDDs9wTllhHQfRxu4fiI6swJ7CUCro5pkgbcznzG5Wpv1Xdt90iI70erVIMAwB5ZXRVoLpiFPRgnpkEDYfMo+IeGsAnLY1WNUkbPXUlHjXfE2G5Z0VYTCMgTtcfKwCbqvhnPzsgAy4DcJt2euSrj3XaJ2T3iPNSUiKbrSNjvHNEqthzTuMFBpfC4Gx1vIo1Qy08pHZ9Ehj4xEQ1FAGXh3pbD1eiIR2A9e35LWEfTKcvA+sg16mrckbgvGmd9tqh1CTJdA2b0SvwI0BOJixOXXNpvxXvtDvQQH0S28CJknflHlZC99U3N/2/RZWzXqKNxjnExJOVp27zsTAo1TsjmYFuHatinhWsENA+fqyTx1UC3D1cLTo0skd03gSFAN6Tje/rLf4JHG4kXAM+Mic+5M0cJVrG3Rb+Y5Z3jetjB6Ip07xrO/Mb9m5Jcblob5FHZzuH0U993WHKCVrYXRTRbVB4meHnC2dUblLidkLRcC9M3zvwFh8IGjlsFgrPqhuQ4CyFVLz/PFR7ra4ieH1V9a0Rd7LUKpLr7p2DdFusIn2abn1fPZzy+SnDgXgeroofsWkI0smc5ZwYmKEHiSeyfp3oE9mZT2kqcOJJz/lZ5zg9axmqZtB2j078jc+QRXP25dH112Q47M+W4KGzsOe7cPXepRTJechrZCdvVkq0Gw2TxN+PDkrmTNzfgMghYh9j2cVLyUg+CFp3+A+spPFOl832eJPgnQ6KY/b4hIYeC4m9uPH6KBjNGQN8vXqLxbkO6VDT0QeJMjzUsyy7OSRQ5o4x0TxCbqVgLLMwzyKjhyMeuMrSADhcSOK1hlUZTw7F34wc93aifaQbnlyPkh19HsOUid2y38diVxOCLLtMjbs61ErRcerNFoaZmR196nUZx7ll4NlR0QYAzce8AJv+nn8/d9UknWhtpelsXjJmMhv7yl9H4T3vSdPu8gJ+LZMzkoweBLzrPEMzygu7suPobVgNwFhuC6Er2YN1hFg6BblHkqPrDeJ4lCqV/QssrEwYiMouds3HierkrcqIUbNKtjRMAxbPNJvx4tEnO56lkOqu1gC4nPkSM77lUEnogFxOQFyeQG2Vn3bNVBGp/UIjbGyYHd4Lw0je5kzYAKcPoB5PTc1rdobd2WWUDNbWHw7aYDWDjxPElWoy9IlKPgDBtcWEwWk2E7Itrds9iljHB2UDLl+3qAzXsTiCBmAe3vlKfaSCRs3gwecZZ71aktGbi9jWPaLcIFshlElZDxv59Wxaul/8vq35WWTTcHNG6Jtst81E9mnHo9cZ5nzXtTdNrCPkryRmJHdPBVcW5C0XWVGlnojabeSTHScBl43+itiKuwEnZb5p/A4AtBcW9I7AN28lNoLFdIVMmjgI7/JRSp6rHawHGOZ8JTFLDFpLn/Eb8By6kOpVnK0G43ncsDUE4REbBEdsnuVqXEdtuOfYguIJvLTmbc5TLJ3g7b8UMYOpZ7Dv8uPWtVtTogTwBCxdInVDTkZjtGzsT3vYYCTGV9ht4ojKmKUbQ3UqSCNoHo8UnXxZaCpZiLdV+vb4LOxL5kD69SHkEqOkwwsAmLLOqYjVYDwHkk/6od4XQ5qODBQcsm86oAl31m2Mxu+gWbWxgbMCZ2k9/JUpvdUsG7d2Ubzbml+g1xjFeuJImbZfxlM9yzn1GmLgRvB7e4dvBaX2B7pJIHAD1wRho6mACRJ+qKkxXFHPiSYbrOMwABPqy6XQeihSbrOHTdnN9UHYPNFweGa1xeBFo+friUZ1cAwfUztErSMUssmUnLCDOKXqOtzO8DtPyyRHuJ9Hd39wSGKjVOsRP1tkYHrkqlImMSr3g6wkX3DPZ2JXEU5AiCYiMuQt19qt725M7PXUpwt3tyIb0jA7OuSFnHLNJYQ1pgw05CNszs3bAuW0Pi+jB/hdDpQzrWAsuWo0S10D19UN5CKwbdN2Xbw+ihzttu1AoNJIDQdY2ET3jZ4LXo4XUEvAc/YLEDiTtKEDAaM0e9zw93Ra244nYRwGcpytWgarSTG07foh1sUSI27Tt7UnUccsjv2KZTVUhxi7tnqtcmRt/EPkk30yTYnntHAg5lHN/isdh81cNPA7yLFYWbUBpNPDvFuRRgDx7PkpJ2eIUD1B8khiukB0Y4j1CsG9BrcwTN+R81bFPAEuy9Qk/tOuZiAB6neVEnRaVmlTDRMiZmZOcngrfdz8ISAq5hLOrcfXyQuRoHx2a+PxAcwAbCs/VHopai8l2ezqR9TgOxE59nYow6qjewuiWtu862WeyNnHIJ8ujKPAd68XIIpF2WzaTYcBbNdySWjibb2EFW5GzL13Iopjbacht5qGUg0mLuzJNgOSg12gG5J22v/AArWNi3oriKliMhzA+fklak65N8tl9h2iFU12kZvudkDhuuhVniXXItF1m3ZolRpAzNtgORaNuZzckcSTqgS3kBbOe1W98C3pEvN7DIRa8ZlLOiWjVNh6lJuxpFHusbtuY/laWj6Wq2Yu45xAAA3bdvaksLS1iwats757FrVKMiPOI7NqIL0U34ZuJeDtnMZRlKz2YIvMASe6OO5bzyxtyBfcBGWxBGLjMQNgFh3IaXoJvwJhMEKQkAF0XeT4cEOphwelrCTxsgVKx23CC503BhJyQ1Fhm4dp/GDvtHZJQH0heDIG/5SodUnPLeqOJ5jesnRorIjap1Y9Sva0+X1UdyiiyTPA71UneIlSOIz2hec7r2JDMPTdfpNZw1vIf8A67VbDm2R8UCvg/eVXPMkTYDcLD59aabhnN+G/A/PbtWTNFoIL5JevTOf1MJmnRiZCHVcZzj1kUhgcDF5FybHYmfWaWewg9ETtOXG3ihfaRu7wgKO2osOrLwRJnVm5ygcBwTOtAv0dwmOxCfiJBLBrR+I9EcgUpicQ7VHQF9hMnvXptpHnJNjFfFgWD2jv70r9qfq5g8iZPcg4jEugy0QLWju4JepUEAavFQ5WaKKQ22u6wiw4+roJqTeDnPZ/Cik0n4Q4nhJ/hM0sA8iSdXn8kK2DpAxOrEHdcxnnkmaGBJJL7DcLmL3M5K7GMbYdJ2es7IcgorV9azbXvPmhJLYm29B2PgAMgNGZJzQquInK3LzS+sBYW4b+SE945HuTcsAol31N6Hr8b7iqtc7YNY/p80VuFccmO6xbvWbl8Lr6CII3zwuOxUedp7W37Qmxo+psgcSZHZsU/08i5c0HeCfDJTUvg7j9ES/fHDaDzVSd1uCf/p4zLhfhE9U2QvsTctaeER3yk0xpoV1p4j1kpF+ITD8IJnWVTSHqynJWCg9AoOIJDSRmATCYeQMz1JLG1oY48FL0UhHAUyBuJ2einRNsp4oFFlgfL1dFItJHf8ANYmhYujPM2UOGxQwbR9e/JWY3bEeKBAatKF6OHeUV4j5ocne1MeToKwqObLiG7gs4l51PWS2XYIc/wBxMDkgs0WNp2yM7cpNxzXoODOJTQi3AvcJ1xE3tbjfamWUKc26RG1xt2DNOPpAmNYncBEKXUaYzHef4Qo0DlYucdsFzstA6tiC6s52cz2p8VG2kDgFZ+LA4ngjH0X9IQFN5tquHUiDBPOZDeM37ArvxcfF1AeaVfii7MqbRVMYGFZIBcXdw+iKPdtyaCe3vKzjjBBAcOO9L/aHGzWnrsO0pdh9TadjQLZ+H1QH4wnMwsqo528A9qWrlxsXW7FD5H9KXGjZq4/ZMes0nU0qwGC4Skm6He67nFN4bQDW38RKVtjpIAdMtO0nkCg1NMOi1Nw52Tz9CCSW5H1bipbowkZ80usmPtFGTU0jVtDRcTv4KoxNYm4I7Fsv0XJBsIMiO+eCNS0cDJdncD59yf5yYv0ijGbRqb5O4I40dUcbkAWzHHd2LapYfVFrqdaJn6K1wr0l8z8Mqnox+1w6su9MU9HN9WTjyBZe1ozKPzihfpJiv9PG8wp/pjXbeo8/XYjuxNrAqvvSOGXal1gPtMXqaO/VsQP6a7eOxaDn3z9eirax4IfFBj/SSGKmJbnmdk/JKuruOZshbVFbIq3JkpJDAxUCABz2oBq7yknPIBWXVrucBJlSxpG/X0i0CCWg77SlPtpmGtLuOQQsFSEC2aaaOlGxT2K6lA17vigD9OzmSoZhWtN5dvLro9S1hklq5yGxKxhS9rch2WS1fHbBfg3zOxIaQqmwm1vFbOApD3etFxt9ZqdsrQCjRc4tNrm4y6ua2KWDbunqRKAGqLBUaemeQ8VqoJGTm2Gc8CynXtuVHCc1V9iOJCoks6oBaVBdmlznPDzC9SM1BO5JMKCvqSLZbD1XQm1CAZ6tn8K2w8z5pChVLpkyiUqBRTHPtWQbMfVUpV3AxEidmY+apiLAkblSgYNPjY9iabBpUOPeRmErWqDIxvncnMReBvKUZTEkRYKZXoqCBirsMz67VVgJzv3d/Uoc4xyCoxxkje0eMLM08HKDJ28hNx1o3uz+XvCXwjpa2dx8/ko94VsnRi1Z/9k="
                                    alt="Avatar"
                                    style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '24px' }}
                                />
                                <div>

                                    <Typography className='fw-bold' variant="h5">PAM IU ƠI</Typography>
                                </div>
                                <Edit className="far fa-edit mb-5" style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={handleEditClick} />
                            </Box>
                            <CardContent style={{ padding: '16px' }}>
                                <Typography variant="h5">Thông tin cá nhân</Typography>
                                <Divider style={{ marginTop: '8px', marginBottom: '16px' }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle1">Họ và tên</Typography>
                                        <Typography variant="body1" className="text-muted">
                                            Lương Hải Pam
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle1">Ngày sinh</Typography>
                                        <Typography variant="body1" className="text-muted">
                                            22/09/1999
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid style={{ paddingTop: "10px" }} container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle1">Email</Typography>
                                        <Typography variant="body1" className="text-muted">
                                            info@example.com
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle1">SDT</Typography>
                                        <Typography variant="body1" className="text-muted">
                                            123 456 789
                                        </Typography>
                                    </Grid>
                                </Grid>


                                <Box style={{ display: 'flex', justifyContent: 'start', marginTop: '16px' }}>
                                    <Link href="#!" style={{ marginRight: '16px' }}>
                                        <Facebook className="fab fa-facebook-f fa-lg" />
                                    </Link>
                                    <Link href="#!" style={{ marginRight: '16px' }}>
                                        <Twitter className="fab fa-twitter fa-lg" />
                                    </Link>
                                    <Link href="#!">
                                        <Instagram className="fab fa-instagram fa-lg" />
                                    </Link>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Edit Popup */}
                <Dialog open={openEditPopup} onClose={handleCloseEditPopup}>
                   
                    <h2 className='text-center'style={{paddingTop:"20px"}}>Chỉnh sửa hồ sơ của tôi</h2>
                    <DialogContent>
                        <label htmlFor="upload-avatar" style={{ paddingBottom: "20px" }}>
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCameraIcon />
                            </IconButton>
                            <Typography variant="body2" className="text-muted">
                                Chọn ảnh đại diện
                            </Typography>
                        </label>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Tên tài khoản"
                            defaultValue="Pam Iu Ơi"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Họ và tên"
                            defaultValue="Lương Hải Pam"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            label="Ngày sinh"
                            defaultValue="22/09/1999"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            defaultValue="info@example.com"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            label="SDT"
                            defaultValue="123 456 789"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEditPopup}>Hủy</Button>
                        <Button onClick={handleSaveChanges} variant="contained" color="primary">Lưu thay đổi</Button>
                    </DialogActions>
                </Dialog>
                {/* End Edit Popup */}
            </Container>
        </section>
    );
};

export default MyProfile;
