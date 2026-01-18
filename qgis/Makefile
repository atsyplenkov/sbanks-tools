#/***************************************************************************
# Sbanks QGIS Plugin
#
# Don't Zig. Unzag
#							 -------------------
#		begin				: 2026-01-16
#		copyright			: (C) 2026 by Anatoly Tsyplenkov
#		email				: atsyplenkov@geogr.msu.ru
# ***************************************************************************/
#
#/***************************************************************************
# *																		 *
# *   This program is free software; you can redistribute it and/or modify  *
# *   it under the terms of the GNU General Public License as published by  *
# *   the Free Software Foundation; either version 2 of the License, or	 *
# *   (at your option) any later version.								   *
# *																		 *
# ***************************************************************************/

PLUGINNAME = sbanks

# QGIS plugin directory (Linux default)
QGISDIR = $(HOME)/.local/share/QGIS/QGIS3/profiles/default/python/plugins

.PHONY: default help clean zip deploy derase test

default: help

help:
	@echo "Available targets:"
	@echo "  zip     - Create deployable plugin zip bundle"
	@echo "  deploy  - Deploy plugin to QGIS plugins directory"
	@echo "  derase  - Remove deployed plugin"
	@echo "  clean   - Remove build artifacts"
	@echo "  test    - Run tests (requires Apptainer with QGIS)"

clean:
	@echo "Removing build artifacts..."
	rm -rf $(PLUGINNAME).zip
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete 2>/dev/null || true

zip: clean
	@echo
	@echo "---------------------------"
	@echo "Creating plugin zip bundle."
	@echo "---------------------------"
	@# Create zip excluding unwanted files
	cd $(PLUGINNAME) && zip -9r ../$(PLUGINNAME).zip . \
		-x "*.pyc" \
		-x "*/__pycache__/*" \
		-x "*/.git" \
		-x "*/.git/*" \
		-x "*/.gitignore" \
		-x "*/tests/*" \
		-x "*/test_*" \
		-x "*/.pytest_cache/*" \
		-x "*.egg-info/*" \
		-x "vendor/sbanks-lib/setup.py" \
		-x "vendor/sbanks-lib/pyproject.toml" \
		-x "vendor/sbanks-lib/requirements.txt"
	@echo "Created: $(PLUGINNAME).zip"

deploy: clean
	@echo
	@echo "------------------------------------------"
	@echo "Deploying plugin to QGIS plugins directory"
	@echo "------------------------------------------"
	mkdir -p $(QGISDIR)/$(PLUGINNAME)
	@# Copy plugin files
	cp -r $(PLUGINNAME)/* $(QGISDIR)/$(PLUGINNAME)/
	@# Clean up deployed plugin
	find $(QGISDIR)/$(PLUGINNAME) -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find $(QGISDIR)/$(PLUGINNAME) -type f -name "*.pyc" -delete 2>/dev/null || true
	find $(QGISDIR)/$(PLUGINNAME) -name ".git" -exec rm -rf {} + 2>/dev/null || true
	find $(QGISDIR)/$(PLUGINNAME) -name ".gitignore" -delete 2>/dev/null || true
	rm -rf $(QGISDIR)/$(PLUGINNAME)/vendor/sbanks-lib/tests 2>/dev/null || true
	rm -f $(QGISDIR)/$(PLUGINNAME)/vendor/sbanks-lib/setup.py 2>/dev/null || true
	rm -f $(QGISDIR)/$(PLUGINNAME)/vendor/sbanks-lib/pyproject.toml 2>/dev/null || true
	rm -f $(QGISDIR)/$(PLUGINNAME)/vendor/sbanks-lib/requirements.txt 2>/dev/null || true
	@echo "Plugin deployed to: $(QGISDIR)/$(PLUGINNAME)"

derase:
	@echo
	@echo "-------------------------"
	@echo "Removing deployed plugin."
	@echo "-------------------------"
	rm -rf $(QGISDIR)/$(PLUGINNAME)

test:
	@echo
	@echo "Running tests..."
	@echo "----------------"
	apptainer exec ~/Soft/qgis_ltr.sif bash -c \
		"cd /home/ats/Projects/sbanks/sbanks-tools/qgis && PYTHONPATH=. pytest -v tests/"
