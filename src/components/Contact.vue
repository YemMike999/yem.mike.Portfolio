<!-- Contact.vue (FULL) - no Location + clickable Email/Phone/Telegram + EmailJS send -->
<template>
  <section class="contact p-st py-5" :class="{ dark: nightMode, light: !nightMode }" id="contact">
    <div class="container">
      <div class="row align-items-start">
        <!-- LEFT: Contact info (clickable) -->
        <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
          <h3 class="side-title" :class="{ 'text-light': nightMode }">Contact</h3>

          <div class="info-list">
            <!-- Email -->
            <a class="info-item link-item" :href="emailHref" target="_blank" rel="noopener noreferrer">
              <div class="info-ico ico-email">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="info-text">
                <div class="info-label">Email</div>
                <div class="info-value">{{ contact.email }}</div>
              </div>
            </a>

            <!-- Phone -->
            <a class="info-item link-item" :href="phoneHref">
              <div class="info-ico ico-phone">
                <i class="fas fa-phone"></i>
              </div>
              <div class="info-text">
                <div class="info-label">Phone</div>
                <div class="info-value">{{ contact.phone }}</div>
              </div>
            </a>

            <!-- Telegram -->
            <a class="info-item link-item" :href="telegramHref" target="_blank" rel="noopener noreferrer">
              <div class="info-ico ico-tele">
                <i class="fab fa-telegram-plane"></i>
              </div>
              <div class="info-text">
                <div class="info-label">Telegram</div>
                <div class="info-value">{{ contact.telegram }}</div>
              </div>
            </a>
          </div>
        </div>

        <!-- RIGHT: Form card -->
        <div class="col-lg-8 col-md-12">
          <div class="form-card" :class="{ 'form-card-dark': nightMode }">
            <h3 class="form-title">Send Message</h3>

            <div class="form-grid">
              <div class="field">
                <label class="lbl">Name</label>
                <input
                  type="text"
                  v-model.trim="name"
                  class="inp"
                  :class="{ 'inp-dark': nightMode }"
                  placeholder="John Doe"
                  autocomplete="name"
                />
              </div>

              <div class="field">
                <label class="lbl">Email</label>
                <input
                  type="email"
                  v-model.trim="email"
                  class="inp"
                  :class="{ 'inp-dark': nightMode }"
                  placeholder="john@example.com"
                  autocomplete="email"
                />
              </div>

              <div class="field field-full">
                <label class="lbl">Subject</label>
                <input
                  type="text"
                  v-model.trim="subject"
                  class="inp"
                  :class="{ 'inp-dark': nightMode }"
                  placeholder="What's this about?"
                />
              </div>

              <div class="field field-full">
                <label class="lbl">Message</label>
                <textarea
                  v-model.trim="message"
                  class="inp textarea"
                  :class="{ 'inp-dark': nightMode }"
                  rows="5"
                  placeholder="I'd like to talk about..."
                ></textarea>
              </div>
            </div>

            <button class="btn-send" type="button" :disabled="sending" @click.prevent="sendEmail">
              <i class="fab fa-telegram-plane mr-2"></i>
              {{ sending ? "Sending..." : "Send" }}
            </button>
          </div>
        </div>
      </div>

      <Snackbar
        :showSnackbar="showSnackbar"
        @close="closeSnackbar"
        :snackbarMessage="snackbarMessage"
        :snackbarColor="snackbarColor"
      />
    </div>
  </section>
</template>

<script>
import config from "../../config";
import emailjs from "emailjs-com";
import Snackbar from "./helpers/Snackbar";

export default {
  name: "Contact",
  components: { Snackbar },
  props: { nightMode: Boolean },
  data() {
    return {
      // ✅ change to your real info
      contact: {
        email: "yemmike1100@gmail.com",
        phone: "+885 70 500 313",
        telegram: "@yem_mike",
      },

      name: "",
      email: "",
      subject: "",
      message: "",
      sending: false,

      showSnackbar: false,
      snackbarMessage: "",
      snackbarColor: "",
    };
  },
  computed: {
    emailHref() {
      return "mailto:" + this.contact.email;
    },
    phoneHref() {
      var p = (this.contact.phone || "").replace(/\s+/g, "");
      return "tel:" + p;
    },
    telegramHref() {
      var u = (this.contact.telegram || "").replace("@", "").trim();
      return "https://t.me/" + u;
    },
  },
  methods: {
    closeSnackbar(val) {
      if (!val) setTimeout(() => (this.showSnackbar = val), 900);
    },

    async sendEmail() {
      if (!this.name || !this.email || !this.subject || !this.message) {
        this.showSnackbar = true;
        this.snackbarMessage = "Please fill all fields";
        this.snackbarColor = "#64808E";
        return;
      }

      var isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
      if (!isEmailValid) {
        this.showSnackbar = true;
        this.snackbarMessage = "Please enter a valid email";
        this.snackbarColor = "#64808E";
        return;
      }

      this.sending = true;

      // ✅ MUST match EmailJS template variables
      var params = {
        from_name: this.name,
        user_email: this.email,
        subject: this.subject,
        message: this.message,
        reply_to: this.email,
      };

      try {
        await emailjs.send(
          config.emailjs.serviceID,
          config.emailjs.templateID,
          params,
          config.emailjs.userID
        );

        this.showSnackbar = true;
        this.snackbarMessage = "Thanks! Message received.";
        this.snackbarColor = "#1aa260";

        this.name = "";
        this.email = "";
        this.subject = "";
        this.message = "";
      } catch (err) {
        console.log("EmailJS error:", err);

        this.showSnackbar = true;
        this.snackbarMessage =
          err && (err.text || err.message) ? (err.text || err.message) : "Email failed.";
        this.snackbarColor = "#64808E";
      } finally {
        this.sending = false;
      }
    },
  },
};
</script>

<style scoped>
/* Theme variables */
.contact {
  --accent: #ff7a00;
  --accent2: #ffb000;
  --accentSoft: rgba(255, 122, 0, 0.16);
  padding-top: 70px; /* if navbar fixed */
}

.contact.light {
  background: #ffffff;
  color: #111;
}

.contact.dark {
  background: #111417;
  color: #fff;
}

/* LEFT */
.side-title {
  font-size: 22px;
  font-weight: 900;
  margin-bottom: 18px;
  opacity: 0.95;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 14px;
}

.link-item {
  text-decoration: none;
  color: inherit;
  border-radius: 14px;
  padding: 6px 6px;
  transition: 0.2s ease;
}

.link-item:hover {
  background: rgba(255, 255, 255, 0.04);
}

.contact.light .link-item:hover {
  background: rgba(0, 0, 0, 0.04);
}

.info-ico {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.20);
}

.ico-email { background: linear-gradient(135deg, #ffb000, #ff7a00); }
.ico-phone { background: linear-gradient(135deg, #8a96a3, #5a6673); }
.ico-tele  { background: linear-gradient(135deg, #3b82f6, #2563eb); }

.info-label {
  font-weight: 900;
  font-size: 14px;
  opacity: 0.95;
}

.info-value {
  font-size: 13px;
  opacity: 0.65;
  margin-top: 2px;
}

/* RIGHT CARD */
.form-card {
  border-radius: 18px;
  padding: 22px;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.10);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.10);
}

.form-card-dark {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 70px rgba(0, 0, 0, 0.40);
}

.form-title {
  font-size: 22px;
  font-weight: 900;
  margin: 0 0 18px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.field-full {
  grid-column: 1 / -1;
}

.lbl {
  display: block;
  font-size: 13px;
  font-weight: 800;
  opacity: 0.85;
  margin-bottom: 8px;
}

/* Inputs */
.inp {
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.10);
  background: rgba(0, 0, 0, 0.03);
  padding: 12px 14px;
  outline: none;
  transition: 0.2s ease;
  color: rgba(0, 0, 0, 0.85);
}

.inp:focus {
  border-color: rgba(255, 122, 0, 0.55);
  box-shadow: 0 0 0 4px var(--accentSoft);
}

.inp-dark {
  border: 1px solid rgba(255, 255, 255, 0.10) !important;
  background: rgba(255, 255, 255, 0.06) !important;
  color: rgba(255, 255, 255, 0.88) !important;
}

.inp-dark::placeholder {
  color: rgba(255, 255, 255, 0.45);
}

.textarea {
  resize: none;
  min-height: 140px;
}

/* Button */
.btn-send {
  margin-top: 16px;
  width: 100%;
  border: none;
  border-radius: 14px;
  padding: 14px 16px;
  font-weight: 900;
  cursor: pointer;
  color: #111;
  background: linear-gradient(135deg, var(--accent2), var(--accent));
  box-shadow: 0 18px 45px rgba(255, 122, 0, 0.35);
  transition: 0.2s ease;
}

.btn-send:hover {
  transform: translateY(-1px);
  box-shadow: 0 22px 55px rgba(255, 122, 0, 0.45);
}

.btn-send:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none;
}

/* Responsive */
@media (max-width: 992px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .field-full {
    grid-column: 1 / 2;
  }
}
</style>
