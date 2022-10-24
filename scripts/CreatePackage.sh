#!/bin/zsh
#
#  Creates a new package in the dev hub.
#
#  Copyright (c) 2022, salesforce.com, inc.
#  All rights reserved.
#  SPDX-License-Identifier: BSD-3-Clause
#  For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
#
#  Contact: j.galletta@salesforce.com

readonly devHubOrgAlias=$(jq --raw-output .defaultdevhubusername < .sfdx/sfdx-config.json) || {
    echo "Make sure that \"jq\" is installed and that \"defaultdevhubusername\" is defined in .sfdx/sfdx-config.json." >&2
    exit 1
}

sfdx force:package:create \
    --packagetype "Unlocked" \
    --nonamespace \
    --name "LWRLowBandwidthLWCs" \
    --description "This package contains code and metadata for LWR web components for the Case and Contact objects." \
    --path "force-app" \
    --targetdevhubusername "$devHubOrgAlias"