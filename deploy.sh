#!/bin/bash

# GenMatch Platform Deployment Script
# This script automates the deployment process

set -e

echo "🚀 Starting GenMatch Platform Deployment..."

# Configuration
APP_NAME="genmatch-platform"
REPO_URL="https://github.com/CEO-LEO/genmatch-platform-v3.git"
DEPLOY_PATH="/var/www/genmatch-platform"
BACKUP_PATH="/var/www/backups"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root or with sudo"
    exit 1
fi

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p $DEPLOY_PATH
mkdir -p $BACKUP_PATH
mkdir -p /var/log/pm2

# Backup existing deployment if exists
if [ -d "$DEPLOY_PATH/.git" ]; then
    print_status "Backing up existing deployment..."
    BACKUP_NAME="genmatch-backup-$(date +%Y%m%d-%H%M%S)"
    tar -czf "$BACKUP_PATH/$BACKUP_NAME.tar.gz" -C $DEPLOY_PATH .
    print_status "Backup created: $BACKUP_NAME.tar.gz"
fi

# Clone or pull repository
if [ -d "$DEPLOY_PATH/.git" ]; then
    print_status "Updating existing repository..."
    cd $DEPLOY_PATH
    git fetch origin
    git reset --hard origin/main
else
    print_status "Cloning repository..."
    git clone $REPO_URL $DEPLOY_PATH
    cd $DEPLOY_PATH
fi

# Install dependencies
print_status "Installing dependencies..."
npm ci --production

# Build the application
print_status "Building the application..."
npm run build

# Set proper permissions
print_status "Setting permissions..."
chown -R www-data:www-data $DEPLOY_PATH
chmod -R 755 $DEPLOY_PATH

# Install PM2 globally if not installed
if ! command -v pm2 &> /dev/null; then
    print_status "Installing PM2..."
    npm install -g pm2
fi

# Start or reload the application
if pm2 list | grep -q $APP_NAME; then
    print_status "Reloading application..."
    pm2 reload $APP_NAME
else
    print_status "Starting application..."
    pm2 start ecosystem.config.js --env production
fi

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup

print_status "Deployment completed successfully! 🎉"
print_status "Application is running on port 3000"
print_status "Check status with: pm2 status"
print_status "View logs with: pm2 logs $APP_NAME"

# Display application status
echo ""
pm2 status $APP_NAME
