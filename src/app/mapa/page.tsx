"use client";
import { useTranslation } from '../providers';

export default function MapPage() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Search sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:text-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-gray-100">{t('search')}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="waste-type" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">
                  {t('waste_type')}
                </label>
                <select
                  id="waste-type"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                >
                  <option value="">{t('select_waste')}</option>
                  <option value="plast">{t('waste_plast')}</option>
                  <option value="papir">{t('waste_papir')}</option>
                  <option value="sklo">{t('waste_sklo')}</option>
                  <option value="kov">{t('waste_kov')}</option>
                  <option value="bio">{t('waste_bio')}</option>
                </select>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">
                  {t('location')}
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder={t('enter_address')}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                />
              </div>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors dark:bg-green-700 dark:hover:bg-green-600">
                {t('search_btn')}
              </button>
            </div>
          </div>
        </div>
        {/* Map container */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:text-white">
            <div className="h-[600px] bg-gray-200 rounded-lg dark:bg-gray-900">
              {/* Map component will go here */}
              <p className="text-center text-gray-500 mt-4 dark:text-gray-300">
                {t('loading_map')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 