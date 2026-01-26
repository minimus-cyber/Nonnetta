# GitHub Pages Setup Guide for www.nonnetta.eu

## ✅ Completed Steps

The following files have been created and are ready for deployment:

1. ✅ **index.html** - Main website with neurocognitive stimulation app
2. ✅ **CNAME** - Contains custom domain `www.nonnetta.eu`
3. ✅ **.nojekyll** - Prevents Jekyll processing
4. ✅ **DNS_CONFIGURATION.md** - Detailed DNS setup instructions
5. ✅ **README.md** - Updated project documentation

## 🚀 Next Steps: Activate GitHub Pages

To make the website live, you need to configure GitHub Pages in the repository settings:

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/minimus-cyber/Nonnetta
2. Click on **Settings** (tab near the top)
3. Scroll down to **Pages** in the left sidebar (under "Code and automation")
4. Under **Source**, select:
   - Branch: `copilot/fix-github-pages-configuration` (or merge to `main` first)
   - Folder: `/ (root)`
5. Click **Save**

### Step 2: Configure Custom Domain

In the same GitHub Pages settings:

1. Under **Custom domain**, enter: `www.nonnetta.eu`
2. Click **Save**
3. ✅ Check the box for **Enforce HTTPS** (recommended for security)

**Note**: The CNAME file in the repository already contains the domain, so it may auto-populate.

### Step 3: Configure DNS Records

You need to configure DNS records with your domain registrar (e.g., GoDaddy, Namecheap, Cloudflare):

#### Required: CNAME Record for www

```
Type:  CNAME
Name:  www
Value: minimus-cyber.github.io
TTL:   3600 (or auto)
```

#### Optional: A Records for Root Domain

If you want `nonnetta.eu` (without www) to also work:

```
Type:  A
Name:  @ (or blank for root)
Value: 185.199.108.153

Type:  A
Name:  @
Value: 185.199.109.153

Type:  A
Name:  @
Value: 185.199.110.153

Type:  A
Name:  @
Value: 185.199.111.153
```

### Step 4: Wait for DNS Propagation

- DNS changes can take **5 minutes to 48 hours** to propagate globally
- You can check propagation status at: https://www.whatsmydns.net/

### Step 5: Verify HTTPS Certificate

After DNS propagates and GitHub Pages is configured:

1. Return to Settings > Pages
2. You should see a green checkmark next to your custom domain
3. GitHub will automatically provision an SSL certificate (may take a few minutes)
4. The "Enforce HTTPS" option should be checked

## 🔍 Verification Checklist

Once everything is configured, verify:

- [ ] GitHub Pages is enabled for the correct branch
- [ ] Custom domain `www.nonnetta.eu` is configured in GitHub Pages settings
- [ ] "Enforce HTTPS" is checked
- [ ] CNAME DNS record is configured: `www.nonnetta.eu` → `minimus-cyber.github.io`
- [ ] (Optional) A records for root domain are configured
- [ ] DNS has propagated (test with `dig www.nonnetta.eu CNAME +short`)
- [ ] Website is accessible at https://www.nonnetta.eu
- [ ] HTTPS certificate is valid (padlock icon in browser)

## 🧪 Testing

Run these commands to verify DNS configuration:

```bash
# Check CNAME record
dig www.nonnetta.eu CNAME +short
# Should return: minimus-cyber.github.io

# Check A records (if configured)
dig nonnetta.eu A +short
# Should return GitHub Pages IPs

# Full lookup
nslookup www.nonnetta.eu
```

Visit the sites:
- https://www.nonnetta.eu (should work after DNS propagation)
- https://minimus-cyber.github.io/Nonnetta (direct GitHub Pages URL)

## 🐛 Troubleshooting

### Issue: 404 Error
**Symptoms**: "There isn't a GitHub Pages site here"

**Solutions**:
1. Verify GitHub Pages is enabled in Settings > Pages
2. Confirm the correct branch is selected (`copilot/fix-github-pages-configuration`)
3. Wait a few minutes for GitHub to build the site
4. Check that `index.html` exists in the root of the selected branch

### Issue: DNS Not Resolving
**Symptoms**: "DNS_PROBE_FINISHED_NXDOMAIN" or similar error

**Solutions**:
1. Verify CNAME record is correctly configured with your DNS provider
2. Wait for DNS propagation (up to 48 hours)
3. Use `dig` or `nslookup` to check DNS records
4. Clear your browser cache and DNS cache

### Issue: Certificate Error or HTTPS Not Working
**Symptoms**: "Your connection is not private" or certificate warnings

**Solutions**:
1. Wait for GitHub to provision the SSL certificate (can take 10-15 minutes)
2. Ensure "Enforce HTTPS" is checked in GitHub Pages settings
3. Try visiting the site in an incognito/private window
4. Wait a bit longer if DNS was just configured

### Issue: Custom Domain Shows as "Improperly Configured"
**Symptoms**: Warning in GitHub Pages settings

**Solutions**:
1. Verify CNAME file contains exactly: `www.nonnetta.eu` (no http://, no trailing slash)
2. Check DNS records are correct
3. Remove and re-add the custom domain in settings
4. Wait for DNS propagation

## 📞 Getting Help

If you continue to experience issues:

1. Check GitHub Status: https://www.githubstatus.com/
2. Review GitHub Pages documentation: https://docs.github.com/en/pages
3. Check DNS configuration: https://www.whatsmydns.net/
4. Contact your DNS provider for DNS-specific issues
5. Review detailed instructions in `DNS_CONFIGURATION.md`

## 📋 Summary

**What's been done**:
- ✅ Created all necessary files for GitHub Pages
- ✅ Configured CNAME for custom domain
- ✅ Created a beautiful, accessible web interface
- ✅ Added comprehensive documentation

**What you need to do**:
1. Enable GitHub Pages in repository Settings
2. Configure DNS records with your domain provider
3. Wait for DNS propagation
4. Verify the site is live at https://www.nonnetta.eu

---

**Estimated time to complete**: 15-30 minutes (plus DNS propagation time)
