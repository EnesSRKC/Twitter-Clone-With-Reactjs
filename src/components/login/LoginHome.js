import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class LoginHome extends Component {

    signupHandler = () => {
        let signup = document.getElementById("signup-page");
        signup.style.visibility = "visible";
        signup.style.transform = "translateY(100vh)";
    }

    render() {
        return (
            <div>
                <div id="login-page">
                    <div id="login-left">
                        <div id="login-left-container">
                            <div className="login-feature"><i className="fas fa-search"></i><span className="login-feature-text">İlgi alanlarını
                        takip et</span></div>
                            <div className="login-feature"><i className="fas fa-users"></i><span
                                className="login-feature-text">Organizasyonlarını yönet</span></div>
                            <div className="login-feature"><i className="fas fa-comments"></i><span
                                className="login-feature-text">Arkadaşlarınla anında haberleş</span></div>
                        </div>
                    </div>
                    <div id="login-right">
                        <div id="login-right-container">
                            <div id="logo"><i className="fas fa-snowflake"></i></div>
                            <div id="logo-subtext1">Dünyada şuanda olup bitenleri gör</div>
                            <div id="logo-subtext2">Twitter'a bugün katıl</div>
                            <button id="signup-button" onClick={() => this.signupHandler()}>Kaydol</button>
                            <Link id="signin-button" to="/signin">Giriş Yap</Link>
                        </div>
                    </div>
                </div>
                <footer id="login-footer">
                    <div id="login-footer-container">
                        <ul id="login-footer-list">
                            <li className="login-footer-list-item"><a href="/hakkinda" target="_blank">Hakkında</a></li>
                            <li className="login-footer-list-item"><a href="/hizmet-sartlari" target="_blank">Hizmet Şartları</a></li>
                            <li className="login-footer-list-item"><a href="/gizlilik-politikasi" target="_blank">Gizlilik Politikası</a></li>
                            <li className="login-footer-list-item"><a href="/cerez-politikasi" target="_blank">Çerez Politikası</a></li>
                            <li className="login-footer-list-item"><a href="/reklam-bilgisi" target="_blank">Reklam Bilgisi</a></li>
                            <li className="login-footer-list-item"><a href="/pazarlama" target="_blank">Pazarlama</a></li>
                            <li className="login-footer-list-item"><a href="/kullanici-sözlesmesi" target="_blank">Kullanıcı Sözleşmesi</a></li>
                            <li className="login-footer-list-item"><a href="/gelistiriciler" target="_blank">Geliştiriciler</a></li>
                            <li className="login-footer-list-item"><a href="/dizin" target="_blank">Dizin</a></li>
                            <li className="login-footer-list-item"><a href="/ayarlar" target="_blank">Ayarlar</a></li>
                        </ul>
                    </div>
                    <div id="login-copyright">{String.fromCharCode("169")} 2020 Enes Sirkecioğlu</div>
                </footer>
            </div>
        )
    }
}
